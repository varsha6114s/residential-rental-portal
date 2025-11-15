const API_URL = 'http://localhost:5000';
let token = localStorage.getItem('adminToken');
let currentUser = JSON.parse(localStorage.getItem('adminUser') || 'null');

// Initialize
if (token && currentUser && currentUser.role === 'admin') {
    showDashboard();
}

function showDashboard() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('logout-btn').classList.remove('hidden');
    document.getElementById('admin-name').classList.remove('hidden');
    document.getElementById('admin-name').textContent = `Admin: ${currentUser.name}`;
    showStats();
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (response.ok && result.user.role === 'admin') {
            token = result.token;
            currentUser = result.user;
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(currentUser));
            showDashboard();
        } else {
            alert('❌ Admin access required');
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

function logout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    location.reload();
}

async function showStats() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const [towers, units, amenities, bookings, leases] = await Promise.all([
            fetch(`${API_URL}/api/towers`).then(r => r.json()),
            fetch(`${API_URL}/api/units`).then(r => r.json()),
            fetch(`${API_URL}/api/amenities`).then(r => r.json()),
            fetch(`${API_URL}/api/bookings`, {headers: {'Authorization': `Bearer ${token}`}}).then(r => r.json()),
            fetch(`${API_URL}/api/leases`, {headers: {'Authorization': `Bearer ${token}`}}).then(r => r.json())
        ]);

        const availableUnits = units.filter(u => u.status === 'available').length;
        const occupiedUnits = units.filter(u => u.status === 'occupied').length;
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;
        const activeLeases = leases.filter(l => l.status === 'active').length;

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-6">System Statistics</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-blue-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-blue-600">${towers.length}</div>
                        <div class="text-gray-600">Total Towers</div>
                    </div>
                    <div class="bg-green-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-green-600">${units.length}</div>
                        <div class="text-gray-600">Total Units</div>
                    </div>
                    <div class="bg-yellow-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-yellow-600">${availableUnits}</div>
                        <div class="text-gray-600">Available Units</div>
                    </div>
                    <div class="bg-purple-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-purple-600">${occupiedUnits}</div>
                        <div class="text-gray-600">Occupied Units</div>
                    </div>
                    <div class="bg-red-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-red-600">${pendingBookings}</div>
                        <div class="text-gray-600">Pending Bookings</div>
                    </div>
                    <div class="bg-indigo-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-indigo-600">${activeLeases}</div>
                        <div class="text-gray-600">Active Leases</div>
                    </div>
                    <div class="bg-pink-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-pink-600">${amenities.length}</div>
                        <div class="text-gray-600">Amenities</div>
                    </div>
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <div class="text-3xl font-bold text-teal-600">${Math.round((occupiedUnits/units.length)*100) || 0}%</div>
                        <div class="text-gray-600">Occupancy Rate</div>
                    </div>
                </div>
            </div>
        `;
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading statistics</div>';
    }
}

async function showTowers() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const response = await fetch(`${API_URL}/api/towers`);
        const towers = await response.json();
        
        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">Manage Towers</h3>
                    <button onclick="showAddTowerForm()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">+ Add Tower</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;
        
        towers.forEach(tower => {
            html += `
                <div class="border rounded-lg p-4">
                    <h4 class="font-bold text-lg mb-2">${tower.name}</h4>
                    <p class="text-gray-600 text-sm mb-2">📍 ${tower.address}</p>
                    <p class="text-gray-600 text-sm">🏗️ ${tower.total_floors} floors</p>
                    <p class="text-gray-600 text-sm mb-2">${tower.description || ''}</p>
                    <div class="flex space-x-2 mt-4">
                        <button onclick="editTower(${tower.id})" class="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
                        <button onclick="deleteTower(${tower.id})" class="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading towers</div>';
    }
}

function showAddTowerForm() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-6">Add New Tower</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Tower Name</label>
                    <input type="text" id="tower-name" class="w-full px-4 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Address</label>
                    <input type="text" id="tower-address" class="w-full px-4 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Total Floors</label>
                    <input type="number" id="tower-floors" class="w-full px-4 py-2 border rounded-lg">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Description</label>
                    <textarea id="tower-description" class="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                </div>
                <div class="flex space-x-4">
                    <button onclick="addTower()" class="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">Add Tower</button>
                    <button onclick="showTowers()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    `;
}

async function addTower() {
    const data = {
        name: document.getElementById('tower-name').value,
        address: document.getElementById('tower-address').value,
        total_floors: parseInt(document.getElementById('tower-floors').value),
        description: document.getElementById('tower-description').value
    };

    try {
        const response = await fetch(`${API_URL}/api/towers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('✅ Tower added successfully!');
            showTowers();
        } else {
            alert('❌ Error adding tower');
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

async function deleteTower(id) {
    if (!confirm('Are you sure you want to delete this tower?')) return;

    try {
        const response = await fetch(`${API_URL}/api/towers/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            alert('✅ Tower deleted successfully!');
            showTowers();
        } else {
            alert('❌ Error deleting tower');
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}
