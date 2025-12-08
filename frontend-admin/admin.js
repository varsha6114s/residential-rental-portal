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
            alert('Admin access required');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    token = null;
    currentAdmin = null;
    window.location.href = '../index.html';
}

async function showStats() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const [towers, units, amenities, bookings, leases] = await Promise.all([
            fetch(`${API_URL}/api/towers`).then(r => r.json()),
            fetch(`${API_URL}/api/units`).then(r => r.json()),
            fetch(`${API_URL}/api/amenities`).then(r => r.json()),
            fetch(`${API_URL}/api/bookings`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${API_URL}/api/leases`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
        ]);

        const availableUnits = units.filter(u => u.status === 'available').length;
        const occupiedUnits = units.filter(u => u.status === 'occupied').length;
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;
        const activeLeases = leases.filter(l => l.status === 'active').length;

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-6">System Statistics</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-blue-600">${towers.length}</div>
                        <div class="text-gray-600">Total Towers</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-green-600">${units.length}</div>
                        <div class="text-gray-600">Total Units</div>
                    </div>
                    <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-yellow-600">${availableUnits}</div>
                        <div class="text-gray-600">Available Units</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-purple-600">${occupiedUnits}</div>
                        <div class="text-gray-600">Occupied Units</div>
                    </div>
                    <div class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-red-600">${pendingBookings}</div>
                        <div class="text-gray-600">Pending Bookings</div>
                    </div>
                    <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-indigo-600">${activeLeases}</div>
                        <div class="text-gray-600">Active Leases</div>
                    </div>
                    <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-pink-600">${amenities.length}</div>
                        <div class="text-gray-600">Amenities</div>
                    </div>
                    <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                        <div class="text-3xl font-bold text-teal-600">${Math.round((occupiedUnits / units.length) * 100) || 0}%</div>
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

// ============ TOWERS MANAGEMENT ============
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
                    <button onclick="showAddTowerForm()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">+ Add Tower</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;

        towers.forEach(tower => {
            html += `
                <div class="border rounded-lg p-4 hover:shadow-lg transition">
                    <h4 class="font-bold text-lg mb-2">${tower.name}</h4>
                    <p class="text-gray-600 text-sm mb-2"> ${tower.address}</p>
                    <p class="text-gray-600 text-sm"> ${tower.total_floors} floors</p>
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
                    <input type="text" id="tower-name" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Address</label>
                    <input type="text" id="tower-address" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Total Floors</label>
                    <input type="number" id="tower-floors" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Description</label>
                    <textarea id="tower-description" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" rows="3"></textarea>
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
            alert('Tower added successfully!');
            showTowers();
        } else {
            alert('Error adding tower');
        }
    } catch (error) {
        alert('Error: ' + error.message);
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
            alert('Tower deleted successfully!');
            showTowers();
        } else {
            alert('Error deleting tower');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// ============ UNITS MANAGEMENT ============
async function showUnits() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const response = await fetch(`${API_URL}/api/units`);
        const units = await response.json();

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">Manage Units</h3>
                    <button onclick="showAddUnitForm()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">+ Add Unit</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;

        units.forEach(unit => {
            const statusColor = unit.status === 'available' ? 'green' : unit.status === 'occupied' ? 'red' : 'yellow';
            html += `
                <div class="border rounded-lg p-4 hover:shadow-lg transition">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-lg">Unit ${unit.unit_number}</h4>
                        <span class="bg-${statusColor}-100 text-${statusColor}-800 px-2 py-1 rounded text-xs">${unit.status}</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-2"> ${unit.tower_name}</p>
                    <p class="text-gray-600 text-sm"> ${unit.bedrooms} BR |  ${unit.bathrooms} BA</p>
                    <p class="text-gray-600 text-sm"> ${unit.size_sqft} sq ft | Floor ${unit.floor}</p>
                    <p class="text-2xl font-bold text-red-600 mt-2">₹${unit.rent_amount}/mo</p>
                    <div class="flex space-x-2 mt-4">
                        <button onclick="editUnit(${unit.id})" class="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
                        <button onclick="deleteUnit(${unit.id})" class="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                    </div>
                </div>
            `;
        });

        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading units</div>';
    }
}

async function showAddUnitForm() {
    const towersResponse = await fetch(`${API_URL}/api/towers`);
    const towers = await towersResponse.json();

    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-6">Add New Unit</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Tower</label>
                    <select id="unit-tower" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                        ${towers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2">Unit Number</label>
                        <input type="text" id="unit-number" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Floor</label>
                        <input type="number" id="unit-floor" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2">Bedrooms</label>
                        <input type="number" id="unit-bedrooms" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Bathrooms</label>
                        <input type="number" id="unit-bathrooms" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2">Size (sq ft)</label>
                        <input type="number" id="unit-size" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Rent Amount</label>
                        <input type="number" id="unit-rent" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Status</label>
                    <select id="unit-status" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Description</label>
                    <textarea id="unit-description" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" rows="3"></textarea>
                </div>
                <div class="flex space-x-4">
                    <button onclick="addUnit()" class="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">Add Unit</button>
                    <button onclick="showUnits()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    `;
}

async function addUnit() {
    const data = {
        tower_id: parseInt(document.getElementById('unit-tower').value),
        unit_number: document.getElementById('unit-number').value,
        floor: parseInt(document.getElementById('unit-floor').value),
        bedrooms: parseInt(document.getElementById('unit-bedrooms').value),
        bathrooms: parseInt(document.getElementById('unit-bathrooms').value),
        size_sqft: parseInt(document.getElementById('unit-size').value),
        rent_amount: parseFloat(document.getElementById('unit-rent').value),
        status: document.getElementById('unit-status').value,
        description: document.getElementById('unit-description').value
    };

    try {
        const response = await fetch(`${API_URL}/api/units`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Unit added successfully!');
            showUnits();
        } else {
            alert('Error adding unit');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deleteUnit(id) {
    if (!confirm('Are you sure you want to delete this unit?')) return;

    try {
        const response = await fetch(`${API_URL}/api/units/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            alert('Unit deleted successfully!');
            showUnits();
        } else {
            alert('Error deleting unit');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// ============ AMENITIES MANAGEMENT ============
async function showAmenities() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const response = await fetch(`${API_URL}/api/amenities`);
        const amenities = await response.json();

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">Manage Amenities</h3>
                    <button onclick="showAddAmenityForm()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">+ Add Amenity</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        `;

        amenities.forEach(amenity => {
            html += `
                <div class="border rounded-lg p-4 hover:shadow-lg transition">
                    <h4 class="font-bold text-lg mb-2"> ${amenity.name}</h4>
                    <p class="text-gray-600 text-sm mb-2">${amenity.description || ''}</p>
                    <p class="text-gray-600 text-sm"> ${amenity.availability_hours || 'N/A'}</p>
                    <span class="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">${amenity.is_active ? 'Active' : 'Inactive'}</span>
                    <div class="flex space-x-2 mt-4">
                        <button onclick="deleteAmenity(${amenity.id})" class="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                    </div>
                </div>
            `;
        });

        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading amenities</div>';
    }
}

function showAddAmenityForm() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold mb-6">Add New Amenity</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 mb-2">Amenity Name</label>
                    <input type="text" id="amenity-name" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Description</label>
                    <textarea id="amenity-description" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" rows="3"></textarea>
                </div>
                <div>
                    <label class="block text-gray-700 mb-2">Availability Hours</label>
                    <input type="text" id="amenity-hours" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="e.g., 24/7 or 6:00 AM - 10:00 PM">
                </div>
                <div class="flex space-x-4">
                    <button onclick="addAmenity()" class="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">Add Amenity</button>
                    <button onclick="showAmenities()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    `;
}

async function addAmenity() {
    const data = {
        name: document.getElementById('amenity-name').value,
        description: document.getElementById('amenity-description').value,
        availability_hours: document.getElementById('amenity-hours').value,
        is_active: true
    };

    try {
        const response = await fetch(`${API_URL}/api/amenities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Amenity added successfully!');
            showAmenities();
        } else {
            alert('Error adding amenity');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function deleteAmenity(id) {
    if (!confirm('Are you sure you want to delete this amenity?')) return;

    try {
        const response = await fetch(`${API_URL}/api/amenities/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            alert('Amenity deleted successfully!');
            showAmenities();
        } else {
            alert('Error deleting amenity');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// ============ BOOKINGS MANAGEMENT ============
async function showBookings() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const response = await fetch(`${API_URL}/api/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const bookings = await response.json();

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-6">Manage Bookings</h3>
                <div class="space-y-4">
        `;

        if (bookings.length === 0) {
            html += '<p class="text-gray-600">No bookings found.</p>';
        } else {
            bookings.forEach(booking => {
                const statusColor = booking.status === 'approved' ? 'green' : booking.status === 'rejected' ? 'red' : 'yellow';
                html += `
                    <div class="border rounded-lg p-4 hover:shadow-lg transition">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h4 class="font-bold text-lg">Unit ${booking.unit_number}</h4>
                                <p class="text-gray-600 text-sm"> ${booking.tower_name}</p>
                                <p class="text-gray-600 text-sm"> ${booking.user_name} (${booking.user_email})</p>
                                <p class="text-gray-600 text-sm"> ${booking.user_phone}</p>
                                <p class="text-gray-600 text-sm"> Move-in: ${booking.requested_move_in_date}</p>
                                <p class="text-gray-600 text-sm"> Rent: ₹${booking.rent_amount}/mo</p>
                                <p class="text-gray-600 text-sm"> Requested: ${new Date(booking.created_at).toLocaleDateString()}</p>
                                ${booking.admin_comments ? `<p class="text-gray-600 text-sm mt-2"> Note: ${booking.admin_comments}</p>` : ''}
                            </div>
                            <div class="flex flex-col items-end space-y-2">
                                <span class="bg-${statusColor}-100 text-${statusColor}-800 px-3 py-1 rounded">${booking.status}</span>
                                ${booking.status === 'pending' ? `
                                    <button onclick="approveBooking(${booking.id})" class="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">Approve</button>
                                    <button onclick="rejectBooking(${booking.id})" class="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">Reject</button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading bookings</div>';
    }
}

async function approveBooking(id) {
    const comments = prompt('Add approval comments (optional):');

    try {
        const response = await fetch(`${API_URL}/api/bookings/${id}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ admin_comments: comments || 'Approved' })
        });
        if (response.ok) {
            alert('Booking approved successfully!');
            showBookings();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function rejectBooking(id) {
    const comments = prompt('Add rejection reason:');
    if (!comments) return;

    try {
        const response = await fetch(`${API_URL}/api/bookings/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ admin_comments: comments })
        });
        if (response.ok) {
            alert('Booking rejected');
            showBookings();
        } else {
            alert('Error rejecting booking');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// ============ LEASES MANAGEMENT ============
async function showLeases() {
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div></div>';

    try {
        const response = await fetch(`${API_URL}/api/leases`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const leases = await response.json();

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-2xl font-bold mb-6">Manage Leases</h3>
                <div class="space-y-4">
        `;

        if (leases.length === 0) {
            html += '<p class="text-gray-600">No leases found.</p>';
        } else {
            leases.forEach(lease => {
                const statusColor = lease.status === 'active' ? 'green' : lease.status === 'expired' ? 'red' : 'gray';
                html += `
                    <div class="border rounded-lg p-4 hover:shadow-lg transition">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-bold text-lg">Unit ${lease.unit_number}</h4>
                                <p class="text-gray-600 text-sm"> ${lease.tower_name}</p>
                                <p class="text-gray-600 text-sm"> ${lease.user_name}</p>
                                <p class="text-gray-600 text-sm"> ${lease.start_date} to ${lease.end_date}</p>
                                <p class="text-gray-600 text-sm"> Rent: ₹${lease.monthly_rent}/mo</p>
                                <p class="text-gray-600 text-sm"> Deposit: ₹${lease.security_deposit || 0}</p>
                            </div>
                            <span class="bg-${statusColor}-100 text-${statusColor}-800 px-3 py-1 rounded">${lease.status}</span>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = '<div class="bg-red-100 text-red-700 p-4 rounded">Error loading leases</div>';
    }
}
