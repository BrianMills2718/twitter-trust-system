// Trust system data
// Auto-generated on 2025-05-11 13:55:13
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 01:25 PM",
  "users": [
    {
      "username": "Bitboy_Crypto",
      "trustScore": 0.07742882096739963,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.28580365736788016,
      "trustors": 1,
      "trustees": 6,
      "interests": [],
      "communityId": 5
    },
    {
      "username": "Cobratate",
      "trustScore": 0.07770686577871136,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.16105530272317373,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 5
    },
    {
      "username": "Kylie_pol69",
      "trustScore": 0.07868165446488469,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 3
    },
    {
      "username": "RepSantosNY03",
      "trustScore": 0.07728989300314544,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 4
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.24203380569480495,
      "trustors": 1,
      "trustees": 1,
      "interests": [],
      "communityId": 5
    }
  ],
  "relationships": [
    {
      "source": "Brian_J_Mills",
      "target": "Bitboy_Crypto",
      "value": -4.677476657214644
    },
    {
      "source": "Brian_J_Mills",
      "target": "Cobratate",
      "value": -4.185110693297313
    },
    {
      "source": "Brian_J_Mills",
      "target": "DefenderOfBasic",
      "value": 2.461829819586655
    },
    {
      "source": "Brian_J_Mills",
      "target": "Kylie_pol69",
      "value": -2.461829819586655
    },
    {
      "source": "Brian_J_Mills",
      "target": "RepSantosNY03",
      "value": -4.92365963917331
    },
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
      "value": 4.92365963917331
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
    },
    {
      "id": 4,
      "name": "Community D",
      "color": "#34A853"
    },
    {
      "id": 5,
      "name": "Community E",
      "color": "#8334A4"
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
