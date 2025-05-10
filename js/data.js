// Trust system data
// Auto-generated on 2025-05-10 15:45:42
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 10, 2025 03:42 PM",
  "users": [
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.3185223451299339,
      "trustors": 0,
      "trustees": 2,
      "interests": [
        "health",
        "entertainment"
      ],
      "communityId": 1
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.33703608038418326,
      "trustors": 1,
      "trustees": 0,
      "interests": [
        "science",
        "business",
        "philosophy"
      ],
      "communityId": 1
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.344441574485883,
      "trustors": 1,
      "trustees": 0,
      "interests": [
        "social",
        "analysis"
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
