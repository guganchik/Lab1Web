// function ckChange(ckType){
//   var ckName = document.getElementsByName(ckType.name);
//   var checked = document.getElementById(ckType.id);

//   if (checked.checked) {
//     for(var i=0; i < ckName.length; i++){

//         if(!ckName[i].checked){
//             ckName[i].disabled = true;
//         }else{
//             ckName[i].disabled = false;
//         }
//     } 
//   }
//   else {
//     for(var i=0; i < ckName.length; i++){
//       ckName[i].disabled = false;
//     } 
//   }
// }



function ckChange(chk)
{
  const button = document.getElementById('send');
    var chkList = chk.parentNode.parentNode.parentNode;
    var chks = chkList.getElementsByTagName("input");
    var isEmpty = true;
    for(var i=0;i<chks.length;i++)
    {
        if(chks[i] != chk && chk.checked)
        {
            chks[i].checked=false;
            isEmpty = false;
        }
    }
  button.disabled = isEmpty;
}

$(window).keyup(function(e){
	var target = $('.checkboxes input:focus');
	if (e.keyCode == 9 && $(target).length){
		$(target).parent().addClass('focused');
	}
});
 
$('.checkboxes input').focusout(function(){
	$(this).parent().removeClass('focused');
});

// const checkbox = document.getElementById('myCheckbox');
// var validateR = new Boolean();
//   checkbox.addEventListener('change', (event) => {
//   if(event.currentTarget.checked) {button.disabled = false;}
//   else {button.disabled = true;}
// });


