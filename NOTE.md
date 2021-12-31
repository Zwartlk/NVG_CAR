1. Libraries and frameworks
- FluentUI
- ReactJS, SASS, TypeScript
- Firebase

2.Client
- Logo of the application should be in SVG format. On hover should change its color of every squear to a random one. Get back to black when not hovered.
  -> OK
- Viewports:
      a. Mobile from 0 to 748px. Container should be 100% width of screen.
        -> OK
      b. Other view ports according to framework defaults or average world stats.
        -> OK
- 2 pages each for 3 viweports (mobile, tablet, desktop):
  - List page:
    - "Filter button" should open modal with filters which are present on "Desktop" wireframe
      -> OK
  - Details page
    - Contact buttons should trigger respective actions: open email client, open phone dealer. -> OK
    - Image click should open a "lightbox" gallery.  -> OK
    - Equipment items should be alphabetically orderd and displayed in order presented in wireframe.  -> OK
- Product cards must be fluid and take 100% of parent container. -> OK
- Carousel and image aspectratios should be preserved: 16:9 on mobile, 4:3 on other viewports. -> OK
- Images should be lazy. -> OK
- Image of optimal dimentions should be loaded. -> OK
- Use modern image formats with fallback. -> OK
(Prefered implementation of image requirements in `<picture>` with source queries and attributes)
- Application can be non-intercatvie but must load and display content with JavaScript disabled (Server Side Rendering). -> NON
- `html > head > title` must change its text during navigation to a title provided by api. -> OK
- Every fetch request should trigger YouTube-like loading bar indicator. -> OK
- Navigation patterns:
  - Load data AND navigate -> Using skeloton
- Application should use state management -> Redux
- Should handle api reponse errors, and showing a popup/toast notification. -> OK if not found product
- Some other functionality is available on wireframe only.  -> OK
- Client configuration should be stored in environment variables.  -> config.ts
5. API
- Must be RESTful.
- On every 7th request must return 500 status code response. -> NON, Chua lam
- Response payload should bandwidth friendly (be minimal) and return data present in a wireframe. -> NON, api firebase dang dung realtimedatabase, ko support
