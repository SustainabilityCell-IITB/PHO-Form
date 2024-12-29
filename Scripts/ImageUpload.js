


let url = "https://script.google.com/macros/s/AKfycbwH0mEmfWL7rJmzU5ieYGYnxJgGuypdDJpxgUCF6h5RQhcY18o7U9l5b1q-Rt4lBfZX6A/exec";
let form = document.querySelector('form')
let imageInput = document.querySelector('input[type="file"]')



// On image upload

let imageObj;
imageInput.addEventListener('change', (e)=> {
    let fr = new FileReader();

    fr.addEventListener('loadend', () => {
        let res = fr.result;
        
        let spt = res.split("base64,")[1]
        // console.log(spt)

        imageObj = {
            base64 : spt,
            type : imageInput.files[0].type,
            name : imageInput.files[0].name 
        }
        console.log(imageObj)
        
    })

    fr.readAsDataURL(imageInput.files[0])
})




// On Form Submit

form.addEventListener('submit', (e)=> {
    console.log('Submitted')

    e.preventDefault();
    let formData = new FormData(form)
    let dataPairs = {}

    formData.forEach((value, key) => {
        dataPairs[key] = value;
    })

    dataPairs['imageProof'] = imageObj
    console.log(dataPairs)

    fetch(url, {
        method : "POST",
        body : JSON.stringify(dataPairs)
    })
    .then(r => r.text())
    .then(data => console.log('data uploaded : ', data))
    
    console.log('execution ended')

})


    //     let spt = res.split("base64,")[1];
    //     let obj = {
    //         base64 : spt,
    //         type : file.files[0].type,
    //         name : file.files[0].name
    //     }

    //     fetch(url, {
    //         method : "POST", 
    //         body : JSON.stringify(obj)
    //     })
    //     .then(r => r.text())
    //     .then(data=>console.log(data))
    // fr.readAsDataURL(file.files[0])
