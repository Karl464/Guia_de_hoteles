
    $(function () {
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover();
        $('.carousel').carousel({
          interval: 500
        });
        $('#ModalContactar').on('show.bs.modal', function (e) {
          console.log('El modal de contactar se esta mostrando');
          $('#ContactoBTN').removeClass('btn-outline-success');
          $('#ContactoBTN').addClass('btn-primary');
          $('#ContactoBTN').prop('disabled', true);
        });
        $('#ModalContactar').on('shown.bs.modal', function (e) {
          console.log('El modal de contactar se esta mostrando');
  
        });
        $('#ModalContactar').on('hide.bs.modal', function (e) {
          console.log('El modal de contactar se esta mostrando');
  
        });
        $('#ModalContactar').on('hidden.bs.modal', function (e) {
          console.log('El modal de contactar se esta mostrando');
          $('#ContactoBTN').prop('disabled', false);
        });
      });