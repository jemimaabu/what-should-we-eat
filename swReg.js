if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('sw.js')
    .then(function(swRegistration){
        console.log(swRegistration);

        var serviceWorker;

        if(swRegistration.installing){
            console.log('Resolved at installing: ', swRegistration);
            serviceWorker = swRegistration.installing;
        }else if(swRegistration.waiting){
            console.log('Resolved at installed/waiting: ', swRegistration);
            serviceWorker = swRegistration.waiting;
        }else if(swRegistration.active){
            console.log('Resolved at activated: ', swRegistration);
            serviceWorker = swRegistration.active;
        }
        
        if(serviceWorker){
            serviceWorker.addEventListener('statechange', function(e){
                console.log(e.target.state);
            });
        }

    }).catch(function(error){
        console.log('Error :' + error + " found.");
    })

}