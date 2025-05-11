// Trust system data
// Auto-generated on 2025-05-11 11:25:49
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 11:25 AM",
  "users": [
    {
      "username": "Bitboy_Crypto",
      "trustScore": 0.09086843421184354,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.3395694147416043,
      "trustors": 1,
      "trustees": 4,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.19135268934519706,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "RepSantosNY03",
      "trustScore": 0.0906448809242762,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 3
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.28756458077707886,
      "trustors": 1,
      "trustees": 1,
      "interests": [],
      "communityId": 2
    }
  ],
  "relationships": [
    {
      "source": "Brian_J_Mills",
      "target": "Bitboy_Crypto",
      "value": -5.350520811843448
    },
    {
      "source": "Brian_J_Mills",
      "target": "DefenderOfBasic",
      "value": 2.816063585180762
    },
    {
      "source": "Brian_J_Mills",
      "target": "RepSantosNY03",
      "value": -5.632127170361524
    },
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
      "value": 5.632127170361524
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
    },
    {
      "id": 3,
      "name": "Community C",
      "color": "#FBBC05"
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
