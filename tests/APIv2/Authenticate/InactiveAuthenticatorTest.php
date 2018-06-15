<?php
/**
 * @author Alexandre (DaazKu) Chouinard <alexandre.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

namespace VanillaTests\APIv2\Authenticate;

use Exception;
use Vanilla\Models\AuthenticatorModel;
use Vanilla\Models\SSOData;
use VanillaTests\APIv2\AbstractAPIv2Test;
use VanillaTests\Fixtures\Authenticator\MockSSOAuthenticator;

/**
 * Class InactiveAuthenticatorTest
 */
class InactiveAuthenticatorTest extends AbstractAPIv2Test {

    /** @var MockSSOAuthenticator */
    private $authenticator;

    /**
     * {@inheritdoc}
     */
    public static function setupBeforeClass() {
        parent::setupBeforeClass();
        self::container()->rule(MockSSOAuthenticator::class);
    }

    /**
     * {@inheritdoc}
     */
    public function setUp() {
        parent::setUp();


        /** @var \Vanilla\Models\AuthenticatorModel $authenticatorModel */
        $authenticatorModel = $this->container()->get(AuthenticatorModel::class);

        $uniqueID = uniqid('inactv_auth_');
        $authType = MockSSOAuthenticator::getType();
        $this->authenticator = $authenticatorModel->createSSOAuthenticatorInstance([
            'authenticatorID' => $authType,
            'type' => $authType,
            'SSOData' => json_decode(json_encode(new SSOData($authType, $authType, $uniqueID)), true),
        ]);
        $this->authenticator->setActive(false);

        $session = $this->container()->get(\Gdn_Session::class);
        $session->end();
    }

    /**
     * @expectedException Exception
     * @expectedExceptionMessage Cannot authenticate with an inactive authenticator.
     */
    public function testInactiveAuth() {
        $postData = [
            'authenticate' => [
                'authenticatorType' => $this->authenticator::getType(),
                'authenticatorID' => $this->authenticator->getID(),
            ],
        ];

        $this->api()->post('/authenticate', $postData);
    }
}