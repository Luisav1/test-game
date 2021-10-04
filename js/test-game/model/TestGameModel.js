// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import testGame from '../../testGame.js';

class TestGameModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    assert && assert( tandem instanceof Tandem, 'invalid tandem' );
    //TODO
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    //TODO
  }

  /**
   * Steps the model.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    //TODO
  }
}

testGame.register( 'TestGameModel', TestGameModel );
export default TestGameModel;