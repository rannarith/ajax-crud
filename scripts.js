$(function(){
    // GET/READ
    $('#get-button').on('click', function(){
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(respone) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                respone.products.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">'+ product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">Update/Input</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var creatInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: creatInput.val() }),
            success: function(respone) { 
                console.log(respone);
                creatInput.val('');
                $('#get-button').click();
            }
        });
    });

    // Update
    $('table').on('click', '.update-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(respone) {
                console.log(respone);
                $('#get-button').click();
            }
        });
    }); 

    // Delete
    $('table').on('click', '.delete-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(respone) {
                console.log(respone);
                $('#get-button').click();
            }
        });
    }); 

});