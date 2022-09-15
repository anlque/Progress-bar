import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ProgressBar from "../../components/ProgressBar/ProgressBar.component";

import "./Checkout.extension.style.scss";

class Checkout extends SourceCheckout {
  render() {
    return (
      <>
        <ProgressBar stepMap={this.stepMap} />
        {super.render()}
      </>
    );
  }
}

export default Checkout;
