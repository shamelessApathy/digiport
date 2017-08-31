<?php 
/**
 * Plugin Name: Weather-API
 * Plugin URI: https://aplaceformyhead.org
 * Description: An app that gets weather info on a given city and displays on the page
 * Version: 0.0.1
 * Author:Brian Moniz
 * License: ISC
 * License URI: https://opensource.org/licenses/ISC/
 * Text domain: Weather-API
 */

class Weather_API
{
/**
 * Adds hook listeners and prepares class variables
 *
 * @return void
 */

	public function __construct()
	{
		add_action('admin_menu', array($this, 'menu_item'));
		add_action('wp_head', array($this, 'load_assets'));

		add_shortcode('weather-api', array($this, 'render_weather_api'));
	}

	/**
	 * Loads all of the plugins CSS and JS assets
	 *
	 * @return void
	 */

	public function load_assets()
	{
		wp_register_style('weather-css', plugin_dir_url(__FILE__) . 'css/style.css');
		wp_register_script('weather-js', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery'));

		wp_enqueue_style('weather-css');
		wp_enqueue_script('weather-js');
	}

	/**
	 * Renders the admin sidebar link to the plugins settings page
	 *
	 * @return void
	 */
	public function menu_item()
	{
		add_menu_page(__('Weather-API','weather-api'), __('Weather-API', 'weather-api'), 'edit_pages', 'weather-api', array($this, 'render_leaderboard'), 'dashicons-image-filter');
	}



	public function render_weather_api($args)
	{
		ob_start();
		$city = $args['city'];
?>
	<div class='weather-container' data-city="<?php echo $city ?>">
		<table>
		<tr>
		<td colspan='2' style='text-align:center'> <?php echo $city ?> <span id='cityTitle'></span></td>
		</tr>
		<tr>
		<td>Temp:</td><td id='temp'></td>
		</tr>
		<tr>
		<td>Weather:</td><td id='weather'></td>
		</tr>
		<tr>
		<td>Humidity:</td><td id='humidity'></td>
		</tr>
		</table>
	</div>
<?php
		$html = ob_get_contents();

		ob_end_clean();

		return $html;
	}
}

new Weather_API();