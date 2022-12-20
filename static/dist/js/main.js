$(document).ready(function() {

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    $("#tbclientstatus").DataTable({
        "dom": 'Blfrtip',
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
        // "responsive": true, "lengthChange": true, "autoWidth": true,
        // "buttons": ["excel", "pdf", "colvis"],
        "lengthMenu": [20, 50, 100, "1000"],
        "processing": true,
        "serverSide": true,
        "destroy": true,
        "paging": true,
        "ordering": true,
        "order": [5, "desc"],
        "ajax": {
            'url': "clientstatus/list",
            'type': 'POST',
            'X-CSRFToken': csrftoken,
            'data': {},
            'dataType': 'json',
        },
        "columnDefs": [{
                "targets": 0,
                "data": null,
                "render": function(data, type, row) {
                    var html = data[0] ? data[0] : "Unnamed";
                    return html;
                }
            },
            {
                "targets": 3,
                "data": null,
                "render": function(data, type, row) {
                    var rdate = new Date(data[3])
                        // console.log(formatDate(rdate));
                    return formatDate(rdate);
                }
            },
            {
                "targets": 4,
                "data": null,
                "render": function(data, type, row) {
                    var rdate = new Date(data[4])
                        // console.log(formatDate(rdate));
                    return formatDate(rdate);
                }
            },
            {
                "targets": 5,
                "data": null,
                "render": function(data, type, row) {
                    // console.log(data[5]);
                    var html = data[5] ? "<i class='fa fa-circle text-green'></i>" : "<i class='fa fa-circle text-red'></i>";
                    return html;
                }
            },
            {
                "targets": 6,
                "data": null,
                "render": function(data, type, row) {
                    // console.log(data[5]);
                    if (data[5]) {
                        var reg = RegExp(/boss/);
                        if (data[1].length == 41 || reg.test(data[1])) {
                            var html = "<a href='javascript:void(0);' class='conn4ect443 btn btn-default btn-xs' data-toggle='modal' data-target='#reqDelModal'  ><i class='fa fa-arrow-down'></i> Mgmt</a>"
                            html += "<a href='javascript:void(0);' class='connect8443 btn btn-default btn-xs'><i class='fa fa-arrow-down'></i> Oper</a>"
                            html += "<a href='javascript:void(0);' class='sshConnect btn btn-default btn-xs'><i class='fa fa-arrow-down'></i> SSH</a>"
                            return html;
                        } else {
                            var html = 'NotApplied';
                            return html;
                        }
                    } else {
                        var html = 'Unreachable';
                        return html;
                    }
                }
            },
        ],
    });

    // Port 443 connection
    $('#tbclientstatus tbody').on('click', '.conn4ect443', function(e) {
        var clientIp = $(this).parent().parent().children().eq(2).text();
        var cn = $(this).parent().parent().children().eq(1).text();
        // console.log(clientIp);
        var ipSliceList = clientIp.split('.')
            // console.log(ipSliceList);
        var toUrlpart = 'boss-0x';
        for (var i = 0; i < ipSliceList.length; i++) {
            var everyPart = parseInt(ipSliceList[i]).toString(16);
            // console.log("长度：" + everyPart.length);
            if (everyPart.length < 2) {
                everyPart = "0" + String(everyPart);
                // console.log("转化后：" + everyPart);
            }
            // console.log(parseInt(ipSliceList[i]).toString(16));
            toUrlpart = toUrlpart + everyPart;
        }
        // console.log(toUrlpart);
        var url = "/" + toUrlpart + "/";
        console.log("转化后：" + url);
        var openNewLink = window.open(url);
        openNewLink.focus();
    });

    // update the fname in the input 
    $(".custom-file > input").on("change", function() {
        var filePath = $(this).val();
        if (filePath.length > 0) {
            var arr = filePath.split('\\');
            var fileName = arr[arr.length - 1];
            $('.custom-file-label').text(fileName);
        } else {
            $('.custom-file-label').text("Please select Req file to upload");
        }
    })

    $("#tbreqfiles").DataTable({
        "dom": 'Blfrtip',
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        // "responsive": true, "lengthChange": true, "autoWidth": true,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "lengthMenu": [5, 50, 100, 1000],
        "processing": true,
        "serverSide": true,
        // "searching": true,
        "destroy": true,
        "paging": false,
        // "pagingType": 'input',
        "ordering": false,
        // "iDisplayLength": 10,
        // "bLengthChange": true,
        // "lengthMenu": [20, 50, 100, 1000],
        "ajax": {
            'url': "service/reqs/list",
            'type': 'POST',
            'data': {},
            'dataType': 'json',
        },
        "columnDefs": [{
            "targets": 3,
            "data": null,
            "render": function(data, type, row) {
                var id = '"' + row.id + '"';
                var html = "<a href='javascript:void(0);'  class='reqDelete btn btn-danger btn-xs' data-toggle='modal' data-target='#reqDelModal'  ><i class='fa fa-times'></i> Delete</a>"
                    // html += "<a href='javascript:void(0);'   onclick='deleteThisRowPapser(" + id + ")'  class='down btn btn-default btn-xs'><i class='fa fa-arrow-down'></i> Download</a>"
                html += "<a href='javascript:void(0);' class='reqDownload btn btn-default btn-xs'><i class='fa fa-arrow-down'></i> Download</a>"
                return html;
            }
        }],
    });

    $("#tbcertfiles").DataTable({
        "dom": 'Blfrtip',
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        // "responsive": true, "lengthChange": true, "autoWidth": true,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "lengthMenu": [5, 50, 100, 1000],
        //
        "processing": true,
        "serverSide": true,
        // "searching": true,
        "destroy": true,
        "paging": false,
        // "pagingType": 'input',
        "ordering": false,
        // "iDisplayLength": 10,
        // "bLengthChange": true,
        // "lengthMenu": [20, 50, 100, 1000],
        "ajax": {
            'url': "certed/list",
            'type': 'POST',
            'data': {},
            'dataType': 'json',
        },
        // datatable inline-button
        // https://datatables.net/reference/option/columnDefs
        "columnDefs": [{
            "targets": 3,
            "data": null,
            "render": function(data, type, row) {
                var id = '"' + row.id + '"';
                var html = "<a href='javascript:void(0);'  class='certDelete btn btn-danger btn-xs' data-toggle='modal' data-target='#certDelModal'  ><i class='fa fa-times'></i> Delete</a>"
                    // html += "<a href='javascript:void(0);'   onclick='deleteCertByFilename(" + 99 + ")'  class='down btn btn-default btn-xs'><i class='fa fa-arrow-down'></i>Download</a>"
                html += "<a href='javascript:void(0);' class='certDownload btn btn-default btn-xs'><i class='fa fa-arrow-down'></i>Download</a>"
                return html;
            }
        }],
    });

    // delete req files
    // $('#tbreqfiles tbody').on('click', '.reqDelete', function () {
    //   var reqFileName = $(this).parent().parent().children(".dtr-control").text();
    //   // console.log(certFileName);
    //   $.post("service/reqs/delete", { 'filename': reqFileName }, function (result) {
    //     console.log(result)
    //     $('#tbreqfiles').DataTable().ajax.reload();
    //   });
    // });
    // delete req files with warning modal
    $('#reqDelModal').on('show.bs.modal',
        function(e) {
            var reqFileName = $(e.relatedTarget).parent().parent().children(".dtr-control").text();
            $(this).on('click', '.btn-danger', { 'filename': reqFileName }, function(e) {
                // alert("Deleted!!");
                $.post("service/reqs/delete", { 'filename': reqFileName }, function(result) {
                    // console.log(result)
                    $('#tbreqfiles').DataTable().ajax.reload(); // reload table data
                });
                $('#reqDelModal').modal('hide'); // hide modal
            });
        })

    // delete cert files
    // $('#tbcertfiles tbody').on('click', '.certDelete', function () {
    //   var certFileName = $(this).parent().parent().children(".dtr-control").text();
    //   // console.log(certFileName);
    //   $.post("/service/certed/delete", { 'filename': certFileName }, function (result) {
    //     console.log(result)
    //     $('#tbcertfiles').DataTable().ajax.reload();
    //   });
    // });
    // delete cert files with warning modal
    $('#certDelModal').on('show.bs.modal',
        function(e) {
            var certFileName = $(e.relatedTarget).parent().parent().children(".dtr-control").text();
            $(this).on('click', '.btn-danger', { 'filename': certFileName }, function(e) {
                // alert("Deleted!!");
                $.post("service/certed/delete", { 'filename': certFileName }, function(result) {
                    // console.log(result)
                    $('#tbcertfiles').DataTable().ajax.reload();
                });
                $('#certDelModal').modal('hide'); // hide modal
            });
        })

    // req files download
    $('#tbreqfiles tbody').on('click', '.reqDownload', function() {
        var reqFileName = $(this).parent().parent().children(".dtr-control").text();
        //Set the File URL.
        var url = "service/reqs/dl/" + reqFileName;
        console.log(url);
        $.ajax({
            url: url,
            cache: false,
            xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 2) {
                        if (xhr.status == 200) {
                            xhr.responseType = "blob";
                        } else {
                            xhr.responseType = "text";
                        }
                    }
                };
                return xhr;
            },
            success: function(data) {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([data], { type: "application/octetstream" });

                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, reqFileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = $("<a />");
                    a.attr("download", reqFileName);
                    a.attr("href", link);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);
                }
            }
        });
    });

    // cert files download
    $('#tbcertfiles tbody').on('click', '.certDownload', function(e) {
        var certFileName = $(this).parent().parent().children(".dtr-control").text();
        e.preventDefault();
        var url = 'service/certed/dl/' + certFileName;
        console.log(url);
        window.location.href = url;
    });

    // $('#tbcertfiles tbody').on('click', '.certDownload', function () {
    //   var certFileName = $(this).parent().parent().children(".dtr-control").text();
    //   //Set the File URL.
    //   var url = "service/reqs/dl/" + certFileName;
    //   console.log(url);
    //   $.ajax({
    //     url: url,
    //     cache: false,
    //     xhr: function () {
    //       var xhr = new XMLHttpRequest();
    //       xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 2) {
    //           if (xhr.status == 200) {
    //             xhr.responseType = "blob";
    //           } else {
    //             xhr.responseType = "text";
    //           }
    //         }
    //       };
    //       return xhr;
    //     },
    //     success: function (data) {
    //       //Convert the Byte Data to BLOB object.
    //       var blob = new Blob([data], { type: "application/octet-stream" });

    //       //Check the Browser type and download the File.
    //       var isIE = false || !!document.documentMode;
    //       if (isIE) {
    //         window.navigator.msSaveBlob(blob, certFileName);
    //       } else {
    //         var url = window.URL || window.webkitURL;
    //         link = url.createObjectURL(blob);
    //         var a = $("<a />");
    //         a.attr("download", certFileName);
    //         a.attr("href", link);
    //         $("body").append(a);
    //         a[0].click();
    //         $("body").remove(a);
    //       }
    //     }
    //   });
    // });

});