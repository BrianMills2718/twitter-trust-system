// Trust system data
// Auto-generated on 2025-05-10 15:14:36
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 10, 2025",
  "users": [
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.47619047619047616,
      "trustors": 0,
      "trustees": 1,
      "interests": [
        "innovation",
        "technology"
      ],
      "communityId": 1
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.5238095238095238,
      "trustors": 1,
      "trustees": 0,
      "interests": [
        "business",
        "analysis"
      ],
      "communityId": 1
    }
  ],
  "relationships": [
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
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
