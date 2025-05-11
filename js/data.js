// Trust system data
// Auto-generated on 2025-05-11 09:43:37
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 09:41 AM",
  "users": [
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.37407400966932397,
      "trustors": 1,
      "trustees": 3,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.21079512086871444,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "RepSantosNY03",
      "trustScore": 0.09834860767512917,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.31678226178683244,
      "trustors": 1,
      "trustees": 1,
      "interests": [],
      "communityId": 1
    }
  ],
  "relationships": [
    {
      "source": "Brian_J_Mills",
      "target": "DefenderOfBasic",
      "value": 3.333333333333333
    },
    {
      "source": "Brian_J_Mills",
      "target": "RepSantosNY03",
      "value": -6.666666666666666
    },
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
      "value": 6.666666666666666
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
    },
    {
      "id": 2,
      "name": "Community B",
      "color": "#EA4335"
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
