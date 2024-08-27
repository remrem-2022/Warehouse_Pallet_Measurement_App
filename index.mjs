let noofPallet = 0;
let btnbanding = null;
let btncornerProtectorsUse = null;
let btnShrinkWrapped = null;
let btnboxes = null;

(function() {

  $('#saleOrderNumber, #numberOfPallet').on('blur', function() {
    const saleOrderNumber = $('#saleOrderNumber').val();
    const numberOfPallet = $('#numberOfPallet').val();

    if (saleOrderNumber && numberOfPallet) {
      $('#Send').show();
      $('#log').text('');
      noofPallet = numberOfPallet
        // Clear existing pallet containers
        $('.palletContainer').remove();

        // Append the required number of pallet containers
        for (let i = 0; i < numberOfPallet; i++) {
            const palletDiv = `
              <div class="pallet-info palletContainer">
                  <h5 id="title">Pallet No. ${i+1}</h5>
                  <div class="row ">
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Length${i}"  class="input-populated">
                          <label for="Length${i}">Length</label>
                        </div>    
                      </div>
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Width${i}" class="input-populated">
                          <label for="Width${i}">Width</label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Height${i}" class="input-populated">
                          <label for="Height${i}">Height</label>
                        </div>    
                      </div>
                  </div>
                  <div class="row ">
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Weight${i}" class="input-populated">
                          <label for="Weight${i}">Weight</label>
                        </div>
                      </div>
                  </div>
                  <div class="row ">
                    <div class="col">
                        <div class="input_containers">
                          <label class="mylabel" for="pictureOnScale${i}">Click Here to Upload Picture 1</label>
                          <input type="file" id="pictureOnScale${i}" style="display:none;">
                          <p>Pallet on scale with scale reading in view</p>
                        </div>
                        <div class="input_containers">
                          <label class="mylabel" for="pictureSidePallet${i}">Click Here to Upload Picture 2</label>
                          <input type="file" id="pictureSidePallet${i}" style="display:none;">
                          <p>Side view of pallet</p>
                        </div>
                      </div>
                  </div>
                  
              </div>`;
            $('#pallet').append(palletDiv);
            $(`#pictureOnScale${i}`).on("change", function() {
                const fileName = $(this).prop("files")[0]?.name;
                const label = $(`label[for=pictureOnScale${i}]`);
                label.text(fileName || "Click Here to Upload Picture 1");
            });
            $(`#pictureSidePallet${i}`).on("change", function() {
                const fileName = $(this).prop("files")[0]?.name;
                const label = $(`label[for=pictureSidePallet${i}]`);
                label.text(fileName || "Click Here to Upload Picture 2");
            });
        }
    }
  });

  $('#Send').on('click',async function() {
    if (checkbtns()){
      $('#log').hide();
      await submitForm();

    } 
  });
  
  btn();
}());

function checkbtns(){
  if ( btnbanding && btncornerProtectorsUse && btnShrinkWrapped && btnboxes){
    return true
  }
  $('#log').text('There are unchecked items on checklist section');
}

function btn(){
   $('#btnbandingUsedYes').on('click', function() {
      btnbanding = 'Yes';
      $('#btnbandingUsedYes').css('background-color', '#00FF94');
      $('#btnbandingUsedNo').css('background-color', '#D9D9D9');
   })
   $('#btnbandingUsedNo').on('click', function() {
      btnbanding = 'No';
      $('#btnbandingUsedNo').css('background-color', '#FF8787');
      $('#btnbandingUsedYes').css('background-color', '#D9D9D9');
   })
    $('#btncornerProtectorsUseyes').on('click', function() {
      $('#btncornerProtectorsUseyes').css('background-color', '#00FF94');
      $('#btncornerProtectorsUseNo').css('background-color', '#D9D9D9');
      btncornerProtectorsUse = 'Yes'
   })
   $('#btncornerProtectorsUseNo').on('click', function() {
    $('#btncornerProtectorsUseNo').css('background-color', '#FF8787');
    $('#btncornerProtectorsUseyes').css('background-color', '#D9D9D9');
      btncornerProtectorsUse = 'No'
   })
    $('#btnShrinkWrappedYes').on('click', function() {
      $('#btnShrinkWrappedYes').css('background-color', '#00FF94');
      $('#btnShrinkWrappedNo').css('background-color', '#D9D9D9');
      btnShrinkWrapped = 'Yes'
   })
   $('#btnShrinkWrappedNo').on('click', function() {
    $('#btnShrinkWrappedNo').css('background-color', '#FF8787');
    $('#btnShrinkWrappedYes').css('background-color', '#D9D9D9');
      btnShrinkWrapped = 'No'
   })
    $('#btnboxesYes').on('click', function() {
      $('#btnboxesYes').css('background-color', '#00FF94');
      $('#btnboxesNo').css('background-color', '#D9D9D9');
      btnboxes = 'Yes'
   })
   $('#btnboxesNo').on('click', function() {
    $('#btnboxesNo').css('background-color', '#FF8787');
    $('#btnboxesYes').css('background-color', '#D9D9D9');
    btnboxes = 'No'
   })
}



async function submitForm(){
    const formData = new FormData();
    let saleOrderNumber = $('#saleOrderNumber').val();
    let numberOfPallet = $('#numberOfPallet').val();
    let pallet = [];
    
    let palletdet = {
        saleOrderNumber: saleOrderNumber,
        numberOfPallet: numberOfPallet,
        btnbanding: btnbanding,
        btncornerProtectorsUse: btncornerProtectorsUse,
        btnShrinkWrapped: btnShrinkWrapped,
        btnboxes: btnboxes
    };

    let noofPallet = parseInt(numberOfPallet);
    console.log(noofPallet);
   
    if(noofPallet > 0) {
        for (let index = 0; index < noofPallet; index++) {
            let imgonscale = $(`#pictureOnScale${index}`)[0].files[0];
            let imgsidePallet = $(`#pictureSidePallet${index}`)[0].files[0];
            let length = $(`#Length${index}`).val();
            let width = $(`#Width${index}`).val();
            let height = $(`#Height${index}`).val();
            let weight = $(`#Weight${index}`).val()
            if (length == '' || width == '' || height  == '' || weight == ''){
              $('#log').text(`There are fields not filled on Pallet No. ${index + 1}`);
              $('#log').show();
              return 
            }

            let palletobj = {
                Length: parseFloat(length),
                Width: parseFloat(width),
                Height: parseFloat(height),
                Weight: parseFloat(weight),
                palletScaleimg: null,
                palletScalefile : null,
                sidePalletimg: null,
                sidePalletfile : null,
            };


            if(imgonscale){
              palletobj.palletScaleimg = imgonscale.name
              palletobj.palletScalefile = imgonscale
            }
            if(imgsidePallet){
              // console.log(imgsidePallet.name);
              palletobj.sidePalletimg = imgsidePallet.name;
              palletobj.sidePalletfile = imgsidePallet
            }
          
            pallet.push(palletobj);
        }
    }

    formData.append('palletdet', JSON.stringify(palletdet));
    formData.append('pallet', JSON.stringify(pallet));

    for (let i = 0; i < pallet.length; i++) {
      console.log('here', pallet[i].palletScaleimg, pallet[i].sidePalletimg != null)
      if (pallet[i].palletScalefile != null) {
          formData.append('attachments[]', pallet[i].palletScalefile);
      }
      if (pallet[i].sidePalletfile != null ) {
          formData.append('attachments[]', pallet[i].sidePalletfile);
      }
  }
// https://tryexpress-1jl5.onrender.com
// http://localhost:3000
  $('#log').text('Sending pallets please wait...');
  $('#Send').hide();
  $('#log').show();
  fetch('https://tryexpress-1jl5.onrender.com/v1/', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      $('#log').text('Pallet Details sent!');
      $('#log').show();
      noofPallet = 0;
      btnbanding = null;
      btncornerProtectorsUse = null;
      btnShrinkWrapped = null;
      btnboxes = null;
      $('#saleOrderNumber').val('');
      $('#numberOfPallet').val('');
      $('.palletContainer').remove();
      $('#btnbandingUsedYes').css('background-color', '#D9D9D9');
      $('#btnbandingUsedNo').css('background-color', '#D9D9D9');
      $('#btncornerProtectorsUseNo').css('background-color', '#D9D9D9');
      $('#btncornerProtectorsUseyes').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedNo').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedYes').css('background-color', '#D9D9D9');$('#btnboxesNo').css('background-color', '#D9D9D9');
      $('#btnboxesYes').css('background-color', '#D9D9D9');
      console.log('Data sent successfully:', data);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}












