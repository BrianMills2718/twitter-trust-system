// Trust system data
// Auto-generated on 2025-05-11 06:39:09
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 06:39 AM",
  "users": [
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.3395588708574098,
      "trustors": 1,
      "trustees": 2,
      "interests": [
        "philosophy",
        "media",
        "communication",
        "travel"
      ],
      "communityId": 1
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.3266321175756868,
      "trustors": 1,
      "trustees": 0,
      "interests": [
        "development",
        "art",
        "communication"
      ],
      "communityId": 1
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.3338090115669034,
      "trustors": 1,
      "trustees": 1,
      "interests": [
        "research",
        "communication"
      ],
      "communityId": 1
    }
  ],
  "relationships": [
    {
      "source": "Brian_J_Mills",
      "target": "DefenderOfBasic",
      "value": 5.812381937190963
    },
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
      "value": 8.137334712067348
    },
    {
      "source": "_TylerMills_",
      "target": "Brian_J_Mills",
      "value": 10.0
    }
  ],
  "communities": [
    {
      "id": 1,
      "name": "Community A",
      "color": "#4285F4"
    }
  ]
};

// Map to quickly look up users by username
const userMap = {};
trustData.users.forEach(user => {
    userMap[user.username] = user;
});

// Function to get user details
function getUserDetails(username) {
    return userMap[username];
}

// Function to get incoming trust relationships for a user
function getIncomingTrust(username) {
    return trustData.relationships.filter(rel => rel.target === username);
}

// Function to get outgoing trust relationships for a user
function getOutgoingTrust(username) {
    return trustData.relationships.filter(rel => rel.source === username);
}

// Function to get community color for a user
function getUserCommunityColor(username) {
    const user = getUserDetails(username);
    if (!user) return "#999999";
    
    const community = trustData.communities.find(c => c.id === user.communityId);
    return community ? community.color : "#999999";
}
