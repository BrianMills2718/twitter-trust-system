// Trust system data
// Auto-generated on 2025-05-11 14:35:12
// DO NOT EDIT MANUALLY

const trustData = {
  "lastUpdated": "May 11, 2025 02:05 PM",
  "users": [
    {
      "username": "Bitboy_Crypto",
      "trustScore": 0.11284405321241868,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 1
    },
    {
      "username": "Brian_J_Mills",
      "trustScore": 0.11189842025204597,
      "trustors": 1,
      "trustees": 6,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "Cobratate",
      "trustScore": 0.11303202839539629,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 3
    },
    {
      "username": "DefenderOfBasic",
      "trustScore": 0.1467551397072412,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 2
    },
    {
      "username": "GusReichel33763",
      "trustScore": 0.10993948534634038,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 4
    },
    {
      "username": "Kylie_pol69",
      "trustScore": 0.11357656483211247,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 5
    },
    {
      "username": "RepSantosNY03",
      "trustScore": 0.1127987233399868,
      "trustors": 1,
      "trustees": 0,
      "interests": [],
      "communityId": 6
    },
    {
      "username": "_TylerMills_",
      "trustScore": 0.17915558491445815,
      "trustors": 1,
      "trustees": 2,
      "interests": [],
      "communityId": 2
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
      "value": -4.856429311786321
    },
    {
      "source": "_TylerMills_",
      "target": "GusReichel33763",
      "value": -8.741572761215377
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
    },
    {
      "id": 6,
      "name": "Community F",
      "color": "#00ACC1"
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
