

$(document).ready(()=>{


let image = "";

let skills = [
  'User Experience Research',
  'Information Security',
  'Research Program',
  'Microsoft Office Certifications',
  'Video Creation',
  'Database Management'
];


$('body #update_skill_btn').attr('disabled','disabled');
$('body #add_skill_btn').attr('disabled','disabled');

 //Serialize Form to Object
 $.fn.serializeObject = function(){
     let o = {};
     let a = this.serializeArray();
     // console.log(a);
     // console.log(this.serializeArray());
     // console.log(this.serializeObject());
     $.each(a, function() {
         if (o[this.name] !== undefined) {
             if (!o[this.name].push) {
                 o[this.name] = [o[this.name]];
             }
             o[this.name].push(this.value || '');
         } else {
             o[this.name] = this.value || '';
         }
     });
     return o;
 };


 //
 // let fileResp = {};
 //
 // async function getBase64(name){
 //   let inp = document.querySelector('.modal input[name='+name+']');
 //   // console.log(inp.files[0].target);
 //
 //   if(inp.files[0].type === 'application/pdf' || inp.files[0].type === "image/jpg" || inp.files[0].type === "image/jpeg" || inp.files[0].type === "image/png"){
 //
 //     let base64Value = "";
 //     const width = 500;
 //     if (inp.files && inp.files[0]) {
 //       var reader = new FileReader();
 //       const fileName = inp.files[0].name;
 //       let canvBase64;
 //       reader.onload = function (e) {
 //
 //         let img = {};
 //         // if(){
 //           img = new Image();
 //           // }
 //           img.src = e.target.result;
 //           base64Value = img.src;
 //
 //           fileResp.name =  inp.files[0].name;
 //           fileResp.type =  inp.files[0].type;
 //           fileResp.base64 = base64Value;
 //
 //         }
 //
 //         reader.readAsDataURL(inp.files[0]);
 //       }
 //
 //     }else{
 //       alert('invalid File type');
 //       inp.value="";
 //     }
 //
 //   }


//function to handle the form submission to the server side
 async function submitRequest(url,datas,post){

   try{
     let res = {};
     // console.log(url);
     // console.log(datas);
     // console.log(post);
     if(post === true){

       // res = await fetch(url,datas);
     }else{
       // res = await fetch(url);
     }
     // let resp = res.json();
   }catch(e){
     console.log("Error:--  ", e);
   }
 }


$('body')
//Modal Launcher
.on('click', '.call-modal', (elm) => {
	// console.log(elm);
	call_modal({
		title : elm.target.title,
		content : $(elm.target).find('.hidden-content').html(),
		size : elm.target.dataset.modalSize
	})
})


//WHen the user click the option provided it is saved in the input field
.on('click', '.skill_option',(elm)=>{
  let {target} = elm;
  $('body .skill').val(target.innerText)

  let selected = target.dataset.select;


  let skill_listX = skills.find(val => {
    // console.log(val);
    // console.log(elm.target.value);
    return val.toLowerCase() === target.innerText.toLowerCase()
  })
  // console.log(skill_listX);
  if(skill_listX == undefined){
    $('body #'+selected+'_btn').attr('disabled',true);

  }else{

    $('body #'+selected+'_btn').attr('disabled',false);
  }
  setTimeout(()=>{

    $('body .skill_options').addClass('hide-options');
  },200)


})

//If what the user types isn't part of our options the user can't add the skill
.on('blur', '.skill', (elm)=>{
//

setTimeout(()=>{

  let {selected} = elm.target.dataset;

  let value = elm.target.value;


  let skill_listX = skills.find(val => {
    return val.toLowerCase() === value.toLowerCase()
  })
  // console.log(skill_listX);
  if(skill_listX == undefined){
    $('body #'+selected+'_btn').attr('disabled',true);

  }else{

    $('body #'+selected+'_btn').attr('disabled',false);
  }


  $('body .skill_options').addClass('hide-options');

},200)


})

.on('click','.add_skill_show',(elm)=>{

  let {target} = elm;
  let select = target.dataset.showoption;

console.log();

if($('body .skill_options').hasClass('hide-options')){
  $('body .skill_options').removeClass('hide-options');

}else{
  $('body .skill_options').addClass('hide-options');

}
  // console.log(skill_list);
  $('body .skill_options').html('');

  skills.forEach(skill=>{
    // console.log(skill);
    $('body .skill_options').append(`<div class="col-12 skill_option" data-select="${select}">${skill}</div>`);
  })

})

//give options when user types
.on('keyup', '.skill', (elm)=>{


  let {target} = elm;

  let value = target.value;

  let select = target.dataset.selected;

  let skill_list = skills.filter(val => {
    return val.match(new RegExp(value, 'i'))
  })


  if(value.trim() === "" || value.trim().length < 2 || skill_list.length == 0){
    $('body .skill_options').addClass('hide-options');
      target.style.border = '1px solid red';
  }else {
    $('body .skill_options').removeClass('hide-options');
  }

    $('body #'+select+'_btn').attr('disabled',true);

    // console.log(skill_list);
    $('body .skill_options').html('');

    skill_list.forEach(skill=>{
      // console.log(skill);
      $('body .skill_options').append(`<div class="col-12 skill_option" data-select="${select}">${skill}</div>`);
    })


  // console.log(value);

})

//It is triggered when the user clicks on the submit or update button
.on('click', '.modal .submit_now',async (elm)=>{
  // console.log();
  elm.preventDefault();

  let {formname, method, url } = elm.target.dataset;

    let data = {};

    let form = $('.modal form[name='+formname+']');

    let formdata  = form.serializeObject();

    $('body #'+formname+'_btn').addClass('hide_button');
    $('body #'+formname+'_loader').removeClass('hide_button');


    console.log(formdata);

    if(method.toUpperCase() === "POST"){
      data = {
         method: "POST",
           headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        }

        let resp = await submitRequest(url,data,true);

    }else{

      let resp = await submitRequest(url,data,false);

    }
    // console.log(formdata);

})



function call_modal({title, content, size}){


	$('.modal-title').html(' ');
	$('.modal-body').html('');

  // $('body').css('overflow-y','hidden');

	let modal_size = '';

	$('.modal-dialog').removeClass('modal-lg modal-sm');

	// alert(element.size);
	switch (size) {
		case 'lg':
			modal_size = 'modal-lg';
			break;
		case 'sm':
			modal_size = 'modal-sm';
			break;
		case 'md':
			modal_size = 'modal-md';
			break;
	}

	$('.modal-dialog').addClass(modal_size);

	$('.modal-title').html(title);
	$('.modal-body').html(content+'<br class="clear"/>');

setTimeout(()=>{
  $('#global_modal').modal({
    keyboard : false,
    backdrop : 'static',
    show : true,
    focus: true
  });

},200)


}




});


function close_modal(){
  // $('body .skill_options').html('');
  $('body #update_skill_btn').removeClass('hide_button');
  $('body #update_skill_loader').addClass('hide_button');
  $('body #add_skill_btn').removeClass('hide_button');
  $('body #add_skill_loader').addClass('hide_button');
  $('body .skill_options').addClass('hide-options');
  // $('.modal-title').html('');
  // $('.modal-body').html('');
  // $('#global_modal').modal('hide');


}
