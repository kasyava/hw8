$(() =>{

    const baseUrl = window.location.href;

    $("#btnSendMessage").on('click', (e)=>{
        e.preventDefault();


        const originalUrl = $('#originalUrl').val();
        const data = {
            originalUrl: originalUrl
        };

        $.ajax({
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            method: "POST",
            url: baseUrl + "links",
            data: JSON.stringify(data),
            contentType: false,
            processData: false,

        }).then((res) =>{
            let div = $('#shortUrl');
            $('#shortUrlText').text("Your link now looks like this:");
            let a =$('<a>').attr('href', `${baseUrl}${res.shortUrl}`).text(`${baseUrl}${res.shortUrl}`);
            div.html(a);

        })

    })




});