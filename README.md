## Getting Started
Work in progress

## NextJS Version (13.1.2)
This starter kit is using the experimental version & structure of nextjs 13, for NextJS specific documentation please see [NextJS 13 Docs](https://beta.nextjs.org/docs/)

#### All Environment Variables

| Name                               | Required | Default | Description                                       |
| ---------------------------------- | -------- | -       | ------------------------------------------------- |
| WORDPRESS_REST_API_ENDPOINT        | Yes      | -       | WordPress Rest API endpoit                        |
| DOMAIN                             | Yes      | -       | To utilize Next Image                             |

`WORDPRESS_REST_API_ENDPOINT=https://www.yoursite.com/wp-json/wp/v2`

### WordPress Specifics
Add this snippet to your functions.php to add featured_image_url to rest api.
```
/* Featured Image */
add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'featured_img_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}
```