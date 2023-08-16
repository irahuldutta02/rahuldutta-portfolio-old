var lastUpdated = new Date(document.lastModified);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = lastUpdated.toLocaleString('en-US', options);
        document.getElementById('last-modified').innerHTML = formattedDate;