// Copyright 2021, University of Colorado Boulder

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Luisa Vargas
 */

import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import testGame from '../testGame.js';

const testGameColors = {

  // Background color that for screens in this sim
  screenBackgroundColorProperty: new ProfileColorProperty( testGame, 'background', {
    default: 'white'
  } )
};

testGame.register( 'testGameColors', testGameColors );
export default testGameColors;