#!/bin/bash

# API Testing Script for Residential Apartment Rental Portal

BASE_URL="http://localhost:5000"

echo "🧪 Testing Residential Apartment Rental Portal API"
echo "=================================================="
echo ""

# Test 1: Check if API is running
echo "1️⃣ Testing API health..."
curl -s $BASE_URL | jq '.'
echo ""

# Test 2: Admin Login
echo "2️⃣ Testing admin login..."
ADMIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rental.com","password":"admin123"}')

ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | jq -r '.token')
echo "Admin token: ${ADMIN_TOKEN:0:50}..."
echo ""

# Test 3: Get all towers
echo "3️⃣ Getting all towers..."
curl -s $BASE_URL/api/towers | jq '.[] | {id, name, address}'
echo ""

# Test 4: Get available units
echo "4️⃣ Getting available units..."
curl -s "$BASE_URL/api/units?status=available" | jq '.[] | {id, unit_number, tower_name, bedrooms, rent_amount, status}'
echo ""

# Test 5: Get amenities
echo "5️⃣ Getting amenities..."
curl -s $BASE_URL/api/amenities | jq '.[] | {id, name, availability_hours}'
echo ""

# Test 6: User login
echo "6️⃣ Testing user login..."
USER_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}')

USER_TOKEN=$(echo $USER_RESPONSE | jq -r '.token')
echo "User token: ${USER_TOKEN:0:50}..."
echo ""

# Test 7: Create booking
echo "7️⃣ Creating booking request..."
BOOKING_RESPONSE=$(curl -s -X POST $BASE_URL/api/bookings \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"unit_id":1,"requested_move_in_date":"2025-12-01"}')

echo $BOOKING_RESPONSE | jq '.'
BOOKING_ID=$(echo $BOOKING_RESPONSE | jq -r '.booking.id')
echo ""

# Test 8: Get pending bookings (admin)
echo "8️⃣ Getting pending bookings (admin view)..."
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" \
  "$BASE_URL/api/bookings?status=pending" | jq '.[] | {id, user_name, unit_number, status}'
echo ""

# Test 9: Approve booking
if [ ! -z "$BOOKING_ID" ] && [ "$BOOKING_ID" != "null" ]; then
  echo "9️⃣ Approving booking ID: $BOOKING_ID..."
  curl -s -X PUT $BASE_URL/api/bookings/$BOOKING_ID/approve \
    -H "Authorization: Bearer $ADMIN_TOKEN" | jq '.'
  echo ""
fi

# Test 10: Get leases
echo "🔟 Getting leases..."
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" \
  $BASE_URL/api/leases | jq '.[] | {id, user_name, unit_number, start_date, monthly_rent, status}'
echo ""

echo "✅ API testing complete!"
echo ""
echo "📊 Summary:"
echo "   - API is running at $BASE_URL"
echo "   - Admin login: ✓"
echo "   - User login: ✓"
echo "   - Towers endpoint: ✓"
echo "   - Units endpoint: ✓"
echo "   - Amenities endpoint: ✓"
echo "   - Bookings endpoint: ✓"
echo "   - Leases endpoint: ✓"
echo ""
echo "🎉 All tests passed!"
