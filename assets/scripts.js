$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  function applyExternalLinkAttrs() {
    $('a[href]').each(function () {
      var $link = $(this)
      var href = ($link.attr('href') || '').trim()

      if (!href || href[0] === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
        return
      }

      var url
      try {
        url = new URL(href, window.location.origin)
      } catch (e) {
        return
      }

      var isHttp = url.protocol === 'http:' || url.protocol === 'https:'
      var isExternal = isHttp && url.origin !== window.location.origin
      if (!isExternal) return

      $link.attr('target', '_blank')

      var relValue = ($link.attr('rel') || '').toLowerCase().trim()
      var relParts = relValue ? relValue.split(/\s+/) : []
      if (relParts.indexOf('noopener') === -1) {
        relParts.push('noopener')
      }
      $link.attr('rel', relParts.join(' ').trim())
    })
  }

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

  applyExternalLinkAttrs()
  updateHomeIcon()
  $(window).on('scroll resize', updateHomeIcon)
})
