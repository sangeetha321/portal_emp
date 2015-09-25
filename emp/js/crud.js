function clearForm() {
    document.getElementById("updateDiv").innerHTML = "<input id='saveForm' name='saveForm' type='button' value='Save' class='btn btn-primary' onclick='AddData()''>";
    document.getElementById("editEmp").innerHTML = " <h3>Add New Employee</h3>";
    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("inputDept").value = "";
    document.getElementById("inputDesig").value = "";
}

function AddData() {
    var a = document.getElementById("empName").value;
    var b = document.getElementById("empAge").value;
    var c = document.getElementById("inputDept").value;
    var d = document.getElementById("inputDesig").value;
    if ("" == a) {
        document.getElementById("alertDiv").innerHTML = " <h5><font color='#ff0000' align='center'>Please input  Name..!!</font></h5>";
        return false;
    } else if ("" == b) {
        document.getElementById("alertDiv").innerHTML = " <h5><font color='#ff0000' align='center'>Please input  Age..!!</font></h5>";
        return false;

    }
    if ("" == c) {
        document.getElementById("alertDiv").innerHTML = " <h5><font color='#ff0000' align='center'>Please input  Department..!!</font></h5>";

        return false;
    } else if ("" == d) {
        document.getElementById("alertDiv").innerHTML = " <h5><font color='#ff0000' align='center'>Please input  Designation..!!</font></h5>";
        return false;
    } else if (isNaN(b) || b <= 0) {
        document.getElementById("alertDiv").innerHTML = " <h5><font color='#ff0000' align='center'>Invalid Age..!!</font></h5>";

        return false;
    } else {
        var e = "";
        e += "<td>" + a + "</td><td>" + b + "</td><td>" + c + "</td><td>" + d + "</td><td onclick='editData(this)'><a href='#myPopup' data-rel='popup' data-position-to='window' id='alink'><img src='assets/images/edit.png'><a></td><td onclick='deleteData(this)'> <img src='assets/images/delete.png'></td>";
        var f = document.querySelector("#empTable tbody");
        var g = document.createElement("tr");
        g.innerHTML = e;
        f.appendChild(g);
        document.getElementById("empName").value = "";
        document.getElementById("empAge").value = "";
        document.getElementById("inputDept").value = "";
        document.getElementById("inputDesig").value = "";
        window.history.back();
    }
}

function editData(a) {
    document.getElementById("updateDiv").innerHTML = "<input id='saveForm' name='saveForm' type='button' value='Update' class='btn btn-primary' onclick='updateData()'>";
    document.getElementById("editEmp").innerHTML = " <h3>Edit Employee</h3>";
    var b = a.parentNode.rowIndex;
    var c = document.getElementById("empTable");
    var d = c.rows[b].cells[0].innerHTML;
    var e = c.rows[b].cells[1].innerHTML;
    var f = c.rows[b].cells[2].innerHTML;
    var g = c.rows[b].cells[3].innerHTML;
    document.getElementById("empName").value = d;
    document.getElementById("empAge").value = e;
    document.getElementById("inputDept").value = f;
    document.getElementById("inputDesig").value = g;
    document.getElementById("rowVal").value = b;
}

function updateData(a) {
    var b = document.getElementById("rowVal").value;
    var c = document.getElementById("empName").value;
    var d = document.getElementById("empAge").value;
    var e = document.getElementById("inputDept").value;
    var f = document.getElementById("inputDesig").value;
    if ("" == c) {
        alert("Please input  Name..!!");
        return false;
    } else if ("" == d) {
        alert("Please input  Age..!!");
        return false;
    }
    if ("" == e) {
        alert("Please input  Department..!!");
        return false;
    } else if ("" == f) {
        alert("Please input  Designation..!!");
        return false;
    } else if (isNaN(d) || d <= 0) {
        alert("Invalid Age");
        return false;
    } else {
        var g = document.getElementById("empTable");
        g.rows[b].cells[0].innerHTML = c;
        g.rows[b].cells[1].innerHTML = d;
        g.rows[b].cells[2].innerHTML = e;
        g.rows[b].cells[3].innerHTML = f;
        document.getElementById("empName").value = "";
        document.getElementById("empAge").value = "";
        document.getElementById("inputDept").value = "";
        document.getElementById("inputDesig").value = "";
        window.history.back();
    }
}

function deleteData(a) {
    var b = a.parentNode.rowIndex;
    var c = document.getElementById("empTable");
    c.deleteRow(b);
}

function ResetForm() {
    document.getElementById("empTable").reset();
}
//Saerch in Table
function doSearch() {
    var searchText = document.getElementById('searchItem').value;
    var targetTable = document.getElementById('empTable');
    var targetTableColCount;

    //Loop through table rows
    for (var rowIndex = 0; rowIndex < targetTable.rows.length; rowIndex++) {
        var rowData = '';

        //Get column count from header row
        if (rowIndex == 0) {
            targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
            continue; //do not execute further code for header row.
        }

        //Process data rows. (rowIndex >= 1)
        for (var colIndex = 0; colIndex < targetTableColCount; colIndex++) {
            rowData += targetTable.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

        //If search term is not found in row data
        //then hide the row, else show
        if (rowData.indexOf(searchText) == -1)
            targetTable.rows.item(rowIndex).style.display = 'none';
        else
            targetTable.rows.item(rowIndex).style.display = 'table-row';
    }
}

//Table sorting
function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function(a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function makeSortable(table) {
    var th = table.tHead,
        i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0)(function(i) {
        var dir = 1;
        th[i].addEventListener('click', function() {
            sortTable(table, i, (dir = 1 - dir))
        });
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'),
        i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}

window.onload = function() {
    makeAllSortable();
};

// arrow changing
function chngimg(val1) {

    val1 = "imgplus" + val1;

    var img = document.getElementById(val1).src; //= 'Images/Minus.gif';

    var x = img.split("/");
    var t = x.length - 1;
    var y = x[t];
    var imgName = y;

    var imgsrc1 = 'down.png';
    var imgsrc2 = 'up.png';
    if (imgName == imgsrc1) {

        document.getElementById(val1).src = 'assets/images/up.png';

    }
    if (imgName == imgsrc2) {
        document.getElementById(val1).src = 'assets/images/down.png';

    }

}
//map
function initAutocomplete() {
    var water = document.getElementById('water').value;
    var landscape = document.getElementById('landscape').value;
    var customMapType = new google.maps.StyledMapType([{
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{
                hue: landscape
            }, {
                saturation: 67
            }, {
                lightness: -69
            }, {
                visibility: 'simplified'
            }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
                hue: water
            }, {
                saturation: 67
            }, {
                lightness: -69
            }, {
                visibility: 'on'
            }]
        },

        {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{
                hue: water
            }, {
                saturation: -100
            }, {
                lightness: 100
            }, {
                visibility: 'simplified'
            }]
        }
    ], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 8.5241391,
            lng: 76.9366376
        },
        zoom: 7,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    // [END region_getplaces]
    var arrMarkers = [];
    google.maps.event.addListener(map, 'click', function(event) {

        map.panTo(event.latLng);
        map.setZoom(15);
        addMarker(event.latLng);
    });

    function addMarker(location) {

        marker = new google.maps.Marker({
            position: location,
            map: map
        });
        arrMarkers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
                       
        });
    }
    
}
