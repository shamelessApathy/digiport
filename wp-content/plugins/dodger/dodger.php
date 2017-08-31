<?php 
/**
 * Plugin Name: Dodger
 * Plugin URI: https://aplaceformyhead.org
 * Description: A simple dodging game with leader board and admin tracking
 * Version: 0.0.1
 * Author:Brian Moniz
 * License: ISC
 * License URI: https://opensource.org/licenses/ISC/
 * Text domain: dodger
 */

class Dodger
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

		add_shortcode('dodger', array($this, 'render_dodger'));
	}

	/**
	 * Loads all of the plugins CSS and JS assets
	 *
	 * @return void
	 */

	public function load_assets()
	{
		wp_register_style('dodger-css', plugin_dir_url(__FILE__) . 'css/dodger.css');
		wp_register_script('dodger-js', plugin_dir_url(__FILE__) . 'js/dodger.js', array('jquery'));

		wp_enqueue_style('dodger-css');
		wp_enqueue_script('dodger-js');
	}

	/**
	 * Renders the admin sidebar link to the plugins settings page
	 *
	 * @return void
	 */
	public function menu_item()
	{
		add_menu_page(__('Dodge','dodger'), __('Dodger', 'dodger'), 'edit_pages', 'dodger', array($this, 'render_leaderboard'), 'dashicons-image-filter');
	}

	public function render_leaderboard()
	{

	}
	/**
	 * Renders a new isntance of the game on the front-end
	 *
	 * @param Array $args
	 * @return void
	 */

	public function render_dodger()
	{
		ob_start();
?>
	<div class='dodger' data-plugin-dir-url="<?php echo plugin_dir_url(__FILE__);?>">
		<div class='dodger-inner-container'>
			<span class='dodger-score'></span>
			<div class='final-score'>
				<button type='button' class='final-score-button' name='restart' id='replay'>Play Again</button>
			</div>
		</div>
	</div>
	<div class='non-compatible'><h1>Sorry this game was not developed to be played on mobile devices!</h1></div>
<?php
		$html = ob_get_contents();

		ob_end_clean();

		return $html;
	}
}

new Dodger();