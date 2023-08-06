$(document).ready(function () {
  const aId = [];
  const aName = [];

  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      aId.push($(this).attr('data-id'));
      aName.push($(this).attr('data-name'));
    } else {
      const indexId = aId.indexOf($(this).attr('data-id'));
      const indexName = aName.indexOf($(this).attr('data-name'));
      aId.splice(indexId, 1);
      aName.splice(indexName, 1);
    }
    $('.amenities h4').text(aName.join(', '));
  });

  $(function () {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (api) {
        if (api.status === 200) {
          $('div#api_status').addClass('available');
	} else {
          $('div#api_status').removeClass('available');
	}
      }
    });
  });
  $(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: '{}',
      contentType: 'application/json',
      dataType: 'json',
      success: function (place) {
        let strR, strG, strB = '';
        for (const i in place) {
          const nR = place[i].number_rooms;
          const maxG = place[i].max_guest;
          const nB = place[i].number_bathrooms;
          if (nR == 1) {
            strR = 'Bedroom';
	  } else {
            strR = 'Bedrooms';
	  }
          if (maxG == 1) {
            strG = 'Guest';
	  } else {
            strG = 'Guests';
	  }
          if (nB == 1) {
            strB = 'Bathroom';
	  } else {
            strB = 'Bathrooms';
	  }
          let artHtml = `<article>
	    <div class="title_box">
	    <h2> ${place[i].name} </h2>
	    <div class="price_by_night">$${place[i].price_by_night}</div>
	    </div>
	    <div class="information">
	    <div class="max_guest">${place[i].max_guest} ${strG}</div>
            <div class="number_rooms"> ${place[i].number_rooms} ${strR}</div>
            <div class="number_bathrooms">${place[i].number_bathrooms} ${strB}</div>
	    </div>
	    <div class="description">
	        ${place[i].description}
          </div>
	    </article>`;
          $('section.places').append(artHtml);
	}
      }
    });
  });
});
