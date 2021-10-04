// Copyright 2021, University of Colorado Boulder

/**
 * @author Luisa Vargas
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TestGameConstants from '../../common/TestGameConstants.js';
import testGame from '../../testGame.js';
import TestGameModel from '../model/TestGameModel.js';

class TestGameScreenView extends ScreenView {

  /**
   * @param {TestGameModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    assert && assert( model instanceof TestGameModel, 'invalid model' );
    assert && assert( tandem instanceof Tandem, 'invalid tandem' );

    super( {
      tandem: tandem
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - TestGameConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - TestGameConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   * @public
   */
  reset() {
    //TODO
  }

  /**
   * Steps the view.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    //TODO
  }
}

testGame.register( 'TestGameScreenView', TestGameScreenView );
export default TestGameScreenView;