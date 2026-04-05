$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  function updateHomeIcon() {
    var $icon = $('.js-home-icon')
    if (!$icon.length) return

    var $nav = $('#mainNav')
    var isDesktop = window.matchMedia('(min-width: 992px)').matches
    var isTopState = !$nav.hasClass('is-fixed')
    var darkIcon = $icon.attr('data-icon-dark')
    var lightIcon = $icon.attr('data-icon-light')
    var nextSrc = (isDesktop && isTopState) ? lightIcon : darkIcon

    if ($icon.attr('src') !== nextSrc) {
      $icon.attr('src', nextSrc)
    }
  }

  updateHomeIcon()
  $(window).on('scroll resize', updateHomeIcon)
})
