// Network visualization
document.addEventListener('DOMContentLoaded', () => {
    // Set up the visualization container
    const container = document.getElementById('network-visualization');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create SVG element
    const svg = d3.select('#network-visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create a tooltip
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    // Prepare data for D3
    const nodes = trustData.users.map(user => ({
        id: user.username,
        trustScore: user.trustScore,
        communityId: user.communityId,
        interests: user.interests.join(', ')
    }));
    
    const links = trustData.relationships.map(rel => ({
        source: rel.source,
        target: rel.target,
        value: Math.abs(rel.value),
        positive: rel.value > 0
    }));
    
    // Set up force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links)
            .id(d => d.id)
            .distance(d => 200 - d.value/10))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => 30 + d.trustScore * 200));
    
    // Add zoom functionality
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });
    
    svg.call(zoom);
    
    // Create a group for graph elements
    const g = svg.append('g');
    
    // Add links
    const link = g.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', d => Math.sqrt(d.value) / 10)
        .attr('stroke', d => d.positive ? '#999' : '#f55')
        .attr('stroke-opacity', 0.6);
    
    // Add nodes
    const node = g.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', d => 5 + d.trustScore * 150)
        .attr('fill', d => {
            const community = trustData.communities.find(c => c.id === d.communityId);
            return community ? community.color : '#999';
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));
    
    // Add labels
    const labels = g.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text(d => '@' + d.id)
        .attr('font-size', 10)
        .attr('dx', 12)
        .attr('dy', 4);
    
    // Handle node hover
    node.on('mouseover', (event, d) => {
        // Highlight connected nodes
        const connectedNodes = new Set();
        links.forEach(link => {
            if (link.source.id === d.id) connectedNodes.add(link.target.id);
            if (link.target.id === d.id) connectedNodes.add(link.source.id);
        });
        
        node.attr('opacity', n => {
            if (n.id === d.id || connectedNodes.has(n.id)) return 1;
            return 0.2;
        });
        
        link.attr('opacity', l => {
            if (l.source.id === d.id || l.target.id === d.id) return 1;
            return 0.1;
        });
        
        labels.attr('opacity', n => {
            if (n.id === d.id || connectedNodes.has(n.id)) return 1;
            return 0.2;
        });
        
        // Show tooltip
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
        
        tooltip.html(`
            <strong>@${d.id}</strong><br/>
            Trust Score: ${d.trustScore.toFixed(4)}<br/>
            Interests: ${d.interests}
        `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        
        // Update node details panel
        updateNodeDetails(d.id);
    })
    .on('mouseout', () => {
        // Reset highlight
        node.attr('opacity', 1);
        link.attr('opacity', 0.6);
        labels.attr('opacity', 1);
        
        // Hide tooltip
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    })
    .on('click', (event, d) => {
        // Fix the node in place if clicked
        if (!event.defaultPrevented) {
            d.fx = d.x;
            d.fy = d.y;
            updateNodeDetails(d.id, true);
        }
    });
    
    // Handle simulation ticks
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        labels
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
    
    // Set up reset zoom button
    document.getElementById('resetZoom').addEventListener('click', () => {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
        );
    });
    
    // Set up communities legend
    const communitiesLegend = document.getElementById('communities-legend');
    trustData.communities.forEach(community => {
        const item = document.createElement('div');
        item.className = 'd-flex align-items-center mb-2';
        
        const marker = document.createElement('span');
        marker.className = 'community-marker';
        marker.style.backgroundColor = community.color;
        
        const label = document.createElement('span');
        label.textContent = community.name;
        
        item.appendChild(marker);
        item.appendChild(label);
        communitiesLegend.appendChild(item);
    });
    
    // Check URL parameters for user highlighting
    const urlParams = new URLSearchParams(window.location.search);
    const highlightUser = urlParams.get('user');
    if (highlightUser) {
        const userNode = nodes.find(n => n.id === highlightUser);
        if (userNode) {
            // Center view on user
            setTimeout(() => {
                const transform = d3.zoomIdentity
                    .translate(width/2 - userNode.x, height/2 - userNode.y)
                    .scale(1.5);
                
                svg.transition().duration(750).call(
                    zoom.transform,
                    transform
                );
                
                // Update details panel
                updateNodeDetails(highlightUser, true);
            }, 1000);
        }
    }
    
    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        // Keep node fixed if it was previously clicked
        if (!d.fixed) {
            d.fx = null;
            d.fy = null;
        }
    }
    
    // Update node details panel
    function updateNodeDetails(username, fixed = false) {
        const detailsPanel = document.getElementById('node-details');
        const user = trustData.users.find(u => u.username === username);
        
        if (!user) {
            detailsPanel.innerHTML = '<p class="text-muted">User not found</p>';
            return;
        }
        
        // Find incoming and outgoing trust relationships
        const incoming = trustData.relationships.filter(r => r.target === username);
        const outgoing = trustData.relationships.filter(r => r.source === username);
        
        // Find community
        const community = trustData.communities.find(c => c.id === user.communityId);
        
        let html = `
            <div class="mb-3">
                <h5><a href="https://twitter.com/${username}" target="_blank" class="twitter-link">@${username}</a></h5>
                <p>Trust Score: <strong>${user.trustScore.toFixed(4)}</strong></p>
                <p>Community: <span class="badge" style="background-color: ${community.color}">${community.name}</span></p>
                <p>Interests: ${user.interests.join(', ')}</p>
            </div>
        `;
        
        // Incoming trust
        html += '<div class="mb-3"><h6>Trusted by:</h6>';
        if (incoming.length > 0) {
            incoming.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
            const trustors = incoming.map(r => {
                const value = r.value;
                const color = value > 0 ? 'text-success' : 'text-danger';
                return `<li><a href="?user=${r.source}" class="twitter-link">@${r.source}</a>: <span class="${color}">${value > 0 ? '+' : ''}${value}</span></li>`;
            }).join('');
            html += `<ul class="small">${trustors}</ul>`;
        } else {
            html += '<p class="text-muted small">No incoming trust relationships</p>';
        }
        html += '</div>';
        
        // Outgoing trust
        html += '<div><h6>Trusts:</h6>';
        if (outgoing.length > 0) {
            outgoing.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
            const trustees = outgoing.map(r => {
                const value = r.value;
                const color = value > 0 ? 'text-success' : 'text-danger';
                return `<li><a href="?user=${r.target}" class="twitter-link">@${r.target}</a>: <span class="${color}">${value > 0 ? '+' : ''}${value}</span></li>`;
            }).join('');
            html += `<ul class="small">${trustees}</ul>`;
        } else {
            html += '<p class="text-muted small">No outgoing trust relationships</p>';
        }
        html += '</div>';
        
        detailsPanel.innerHTML = html;
        
        // Update the node in the simulation
        if (fixed) {
            const nodeData = nodes.find(n => n.id === username);
            if (nodeData) {
                nodeData.fixed = true;
            }
        }
    }
});