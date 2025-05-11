// Trust system data
// Auto-generated on 2025-05-11 13:15:13
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 01:15 PM",
  "users": [
    {
      "username": "Bitboy_Crypto",
      "trustScore": 0.08378113113260548,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.31053023497223103,
      "trustors": 1,
      "trustees": 5,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "Cobratate",
      "trustScore": 0.08411934704613808,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 3
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.17498710502606343,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "RepSantosNY03",
      "trustScore": 0.08361216739299321,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 4
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.2629700144299687,
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
      "value": -4.826004826007239
    },
    {
      "source": "Brian_J_Mills",
      "target": "Cobratate",
      "value": -4.318004318006477
    },
    {
      "source": "Brian_J_Mills",
      "target": "DefenderOfBasic",
      "value": 2.54000254000381
    },
    {
      "source": "Brian_J_Mills",
      "target": "RepSantosNY03",
      "value": -5.08000508000762
    },
    {
      "source": "Brian_J_Mills",
      "target": "_TylerMills_",
      "value": 5.08000508000762
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
