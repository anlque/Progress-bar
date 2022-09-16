/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from "react";
import "./ProgressBar.style";
import { withRouter } from "react-router";
import { CheckMark } from "../CheckMark/CheckMark.component";
import PropTypes from "prop-types";

export class ProgressBar extends PureComponent {
  static propTypes = {
    stepMap: PropTypes.object,
    location: PropTypes.object,
  };

  static defaultProps = {
    stepMap: {},
  };

  activeStepIndex = 0;

  getSteps = () => {
    const { stepMap } = this.props;

    return Object.entries(stepMap).map(([stepName, stepData], index) => {
      const { title, url } = stepData;
      const formatttedStepName = title.substring(0, title.lastIndexOf(" "));
      const isActiveStep = this.checkActiveStep(url);

      if (isActiveStep) {
        this.activeStepIndex = index;
      }

      return { title: formatttedStepName };
    });
  };

  checkActiveStep = (stepUrl) => {
    const { location } = this.props;
    return location.pathname.includes(stepUrl);
  };

  renderStatus = (stepIndex) => {
    return stepIndex < this.activeStepIndex ? <CheckMark /> : stepIndex + 1;
  };

  render() {
    const steps = this.getSteps();

    return (
      <div>
        <div className="step-container">
          <div className="progress-wrapper">
            {steps.map((step, index) => {
              return (
                <div
                  className={`step ${
                    this.activeStepIndex >= index ? "step_active" : ""
                  }`}
                >
                  <>
                    <div className="step__line"></div>
                    {index !== steps.length - 1 ? (
                      <div className="step__content">
                        <div className="step__status">
                          {this.renderStatus(index)}
                        </div>
                        <div className="step__title">{step.title}</div>
                      </div>
                    ) : null}
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProgressBar);
