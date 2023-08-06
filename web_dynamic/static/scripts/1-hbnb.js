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
});
