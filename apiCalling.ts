/* eslint-disable import/no-cycle */
import axios from 'axios';
import { IAxiosPromise } from '@/models/axiosPromise';
import { IGetProfileResponse } from '@/models/getProfileResponse';
import { GetBalanceResponse } from '@/models/getBalanceResponse';
import { IBaseResponse, INullDataResponse } from '@/models/baseResponse';
import IGetPreferenceForSettingsResponse from '@/models/getPreferenceForSettingsResponse';
import EnumDisplayTimeOption from '@/models/enums/enumDisplayTimeOption';
import { IRenewTokenResponse } from '@/models/renewTokenResponse';
import { IGetTransactionBankListResponse } from '@/models/getTransactionBankListResponse';
import cookieHelper from './cookieHelper';
import { IGetPaymentGatewayBanksResponse } from '@/models/getPaymentGatewayBanksRespone';
import { IRequestAutoDepositBankTransfer, IRequestDepositBankTransfer, IRequestDepositInternetBank } from '@/models/requestDepositBanks';
import { IFeaturesToggleRespone } from '@/models/featuresToggleRespone';
import { IRequestWithdrawalBankTransfer, IRequestWithdrawalInternetBank, IRequestSetPaymentPassword } from '@/models/requestWithdrawalBankTransfer';
import { IRequestTransactionFee } from '@/models/requestTransactionFee';
import { IGetTransactionFeeResponse } from '@/models/getTransactionFeeResponse';
import { GetTransactionHistoryResponse, GetTransactionHistoryRequest, IProceedTransactionRequest } from '@/models/getTransactionHistoryResponse';
import { ICustomerSettingResponse } from '@/models/getCustomerSettingResponse';
import { IGetManualCryptoCurrencyTransactionResponse, IRequestManualCryptoCurrencyDeposit } from '@/models/getManualCryptoCurrencyTransactionResponse';
import { GetThemePropertiesRequestDto } from '@/models/companyThemePropertiesRespone';
import IGetBetListRequest from '@/models/getBetListRequest';
import { IGetBetListResponse } from '@/models/getBetListResponse';
// import FakeAPI from '@/libraries/FakeAPI';
import IGetPromotionApplyListRequest from '@/models/promotion/getPromotionApplyListRequest';
import IGetPromotionApplyListResponse from '@/models/promotion/getPromotionApplyListResponse';
import { IGameProviders } from '@/models/gameProvider';
import IGetBetPayloadRequest from '@/models/getBetPayloadRequest';
import IGetBetPayloadResponse from '@/models/getBetPayloadResponse';
import IGetSportBetRequest from '@/models/sportbet/getSportBetRequest';
import { IGetSportBetResponse } from '@/models/sportbet/getSportBetResponse';
import { IGetAccountCurrencyByUsernameRequest, IGetAccountCurrencyByUsernameResponse, IGetCurrencyWhiteListResponse } from '@/models/currencyWhiteList';
import { ICompanyFlowSettingRequest, ICompanyFlowSettingResponse } from '@/models/companyFlowSetting';
import { IGetRegisterBankListRequest, IGetRegisterBankListResponse } from '@/models/bank';
import { IRegisterRequest, IRegisterResponse } from '@/models/register';
import { store } from '@/store';
import themePropertyHelper from '@/libraries/themePropertyHelper';
import {
  IGetGameProviderListResponse,
  IGetTopGameListResponse,
} from '@/models/IGetPlayableGamesResponse';
import { IGetLanguageSettingResponse } from '@/models/common/language';
import IGetPlayerPreference from '@/models/getPlayerPreference';
import { IGetMultiWalletBalaceResponse } from '@/models/common/wallet';
import {
  IGetBsiGameListResponse,
  IRequestAsiGame,
  IGetMenuTabResponse,
  IGameTypeProviderList,
} from '@/models/bsiGameList';
import {
  IRequestLogin,
  GetLoginResponse,
  IGetWhiteListedIps,
  IGetCurrencies,
  IRequestPlayerIsOnline,
} from '@/models/login';
import { IRequestGameProviderLogin, IGetGameProviderLoginResponse } from '@/models/gameProviderLogin';
import { IWebId } from '@/models/webId';
import commonHelper from '@/libraries/commonHelper';
import {
  IGetRedeemReferralResponse,
  IGetReferralDiagramRequest,
  IGetReferralDiagramResponse,
  IGetReferralLayerAmountResponse,
  IRedeemReferralAmountRequest,
} from '@/models/referral/getReferral';
import { IStatementRequest, IStatementResponse } from '@/models/statement';
import { IRequestPromotion, IGetPromotionResponse, IPromotionApplyReqeust } from '@/models/promotion/promotion';
import { IFormAgentCooperation } from '@/models/agentCooperation';
import {
  ILoginByMatchIdRequest, ILoginByMatchIdResponse,
  IRecommendMatchResponse,
} from '@/models/theme/popular_match/popularMatch';

const protocol = process.env.VUE_APP_CURRENTLY_ENV === 'production' ? 'https://' : `${window.location.href.split('://')[0]}://`;

const bsiApi = axios.create({
  // eslint-disable-next-line no-restricted-globals
  baseURL: `${protocol}${process.env.VUE_APP_END_POINT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
const api = axios.create({
  // eslint-disable-next-line no-restricted-globals
  baseURL: `${protocol}${process.env.VUE_APP_END_POINT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
// eslint-disable-next-line max-len
const manualToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3IjoiMSIsIm4iOiJvcm5nX19pZHJfXzAwMSIsImMiOiIxOTAxNzEzIiwiY3UiOiJJRFIiLCJpIjoiNjEuMjIwLjEyNS43IiwiYSI6IjEiLCJwIjoiMiIsImlhIjoiVHJ1ZSIsImljcCI6IlRydWUiLCJuYmYiOjE2Njg0NzgwMTEsImV4cCI6MTY2ODczNzIxMSwiaXNzIjoiNTY4d2luIiwiYXVkIjoiMV8xOTAxNzEzX29ybmdfX2lkcl9fMDAxIn0.34-QtuDK1WSO7yydtQil6nPUgRRc7f678N2Q7JfY89s';
const temporaryToken = process.env.NODE_ENV === 'development' && store.state.token === '' ? manualToken : (cookieHelper.getCookie('atoken') ?? store.state.token);
if (temporaryToken) {
  api.defaults.headers.common.Authorization = `Bearer ${temporaryToken}`;
  store.state.isCashPlayer = (themePropertyHelper.getDecodeKeyJWT(temporaryToken, 'icp')).toLowerCase() === 'true';
  store.state.username = themePropertyHelper.getDecodeKeyJWT(temporaryToken, 'n');
  cookieHelper.removeCookie('atoken');

  api.interceptors.response.use(
    (response) => response,
    //   if (store.state.auth && store.state.token !== '') {
    //     const checked = api.post('/common/v2/renew-token', {
    //       Token: temporaryToken,
    //     });
    //     store.commit('updateAuth', checked);
    //     if (!checked) {
    //       store.commit('updateToken', '');
    //     }
    //   }
    //   return response;
    // },
    (error) => {
      if (store.state.auth && error.response.config.url === '/common/v2/renew-token') {
        store.commit('resetDefaultInformation');
      }
      return Promise.reject(error);
    },
  );
} else {
  api.interceptors.request.use(
    (config) => Promise.reject(config),
    //   window.location.href = '/';
    //   return Promise.reject(config);
    // },
    (error) => Promise.reject(error),
  );
}
const { isMobile } = commonHelper.getTemplate();
export default {
  renewAxiosInstanceToken(token: string): void {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    store.state.token = token;
  },
  callGetProfileInformation(): IAxiosPromise<IGetProfileResponse> {
    return api.post('/player/v2/get-profile', {});
  },
  callGetPlayerBalance(): IAxiosPromise<GetBalanceResponse> {
    return api.post('/player/v2/get-player-balance', {});
  },
  callGetAllWalletsBalance(): IAxiosPromise<GetBalanceResponse> {
    return api.post('/player/v2/get-all-balance', {});
  },
  callChangePassword(oldPassword: string, newPassword: string): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/update-password', {
      OldPassword: oldPassword,
      NewPassword: newPassword,
    });
  },
  callChangePaymentPassword(oldPassword: string, newPassword: string): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/payment/update-password', {
      OldPassword: oldPassword,
      NewPassword: newPassword,
    });
  },
  callGetPreferenceSetting(): IAxiosPromise<IGetPreferenceForSettingsResponse> {
    return api.post('/player/v2/get-preference', {});
  },
  callUpdatePlayerPreference(displayTime: EnumDisplayTimeOption): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/update-preference', {
      DisplayTime: displayTime,
    });
  },
  callRenewToken(): IAxiosPromise<IRenewTokenResponse> {
    return api.post('/common/v2/renew-token', {
      Token: temporaryToken,
    });
  },
  callGetTransactionBankList(RequestPageType: string): IAxiosPromise<IGetTransactionBankListResponse> {
    return api.post('/player/v2/data/get-bank-list-for-transaction', {
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      RequestPageType,
      Domain: window.location.hostname,
    });
  },
  callgetPaymentGatewayBanks(): IAxiosPromise<IGetPaymentGatewayBanksResponse> {
    return api.post('/payment-gateway/v2/request-banks', {});
  },
  callProceedDepositBankTransfer(params : IRequestDepositBankTransfer): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/transaction/raise-deposit', params);
  },
  callProceedDepositInternetBank(params : IRequestDepositInternetBank): IAxiosPromise<IBaseResponse> {
    return api.post('/payment-gateway/v2/raise-deposit', params);
  },
  callProceedAutoDepositBankTransfer(request: IRequestAutoDepositBankTransfer): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/transaction/raise-deposit', request);
  },
  callUploadFile(params : FormData): IAxiosPromise<IBaseResponse> {
    return api.post('/common/v2/upload-file', params);
  },
  callGetFeaturesToggle(): IAxiosPromise<IFeaturesToggleRespone> {
    return api.post('/common/v2/get-all-feature-toggle', {});
  },
  callWithdrawalBankTransfer(params : IRequestWithdrawalBankTransfer): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/transaction/request-withdrawal', params);
  },
  callWithdrawalInternetBank(params : IRequestWithdrawalInternetBank): IAxiosPromise<IBaseResponse> {
    return api.post('/payment-gateway/v2/raise-withdrawal', params);
  },
  callGetTransactionFee(params : IRequestTransactionFee): IAxiosPromise<IGetTransactionFeeResponse> {
    return api.post('/payment-gateway/v2/payment-provider/get-gcx-withdrawal-fee', params);
  },
  callSetPaymentPassword(params : IRequestSetPaymentPassword): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/set-payment-password', params);
  },
  callGetTransactionHistory(params: GetTransactionHistoryRequest): IAxiosPromise<GetTransactionHistoryResponse> {
    return api.post('/common/v2/transaction/get-player-transactions-in-several-transaction-types', params);
    // return FakeAPI.getTransactionHistory(params);
  },
  callProceedTransaction(params : IProceedTransactionRequest): IAxiosPromise<INullDataResponse> {
    return api.post('/common/v2/transaction/proceed-transaction', params);
    // return FakeAPI.proceedTransaction(params);
  },
  callGetCustomerSetting(RequestId: string): IAxiosPromise<ICustomerSettingResponse> {
    return bsiApi.post('/appsettings/player/v2/get-customer-settings', {
      Id: RequestId,
      Domain: window.location.hostname,
    });
  },
  callGetManualCryptoCurrencyTransaction(RequestPageType: string): IAxiosPromise<IGetManualCryptoCurrencyTransactionResponse> {
    return api.post('/player/v2/data/get-player-manual-cryptocurrency-transaction', {
      RequestPageType,
      Domain: window.location.hostname,
    });
  },
  callProceedManualCryptoCurrencyDeposit(params : IRequestManualCryptoCurrencyDeposit): IAxiosPromise<IBaseResponse> {
    return api.post('/player/v2/transaction/raise-manual-cryptocurrency-deposit', params);
  },
  callGetThemeProperties(params: GetThemePropertiesRequestDto): IAxiosPromise<IBaseResponse> {
    return bsiApi.post('/theme/v2/get-theme-properties', params);
  },
  callGetPromotionApplyList(params: IGetPromotionApplyListRequest): IAxiosPromise<IGetPromotionApplyListResponse> {
    return api.post('/common/v2/promotion/get-apply-list', params);
    // return FakeAPI.getPromotionApplyList(params);
  },
  CallGetGameBetList(params : IGetBetListRequest): IAxiosPromise<IGetBetListResponse> {
    return api.post('/game-provider/v2/get-games-bet-list', params);
    // return FakeAPI.getGameBetList(params);
  },
  CallGetCasinoBetList(params : IGetBetListRequest): IAxiosPromise<IGetBetListResponse> {
    return api.post('/game-provider/v2/get-casino-bet-list', params);
    // return FakeAPI.getCasinoBetList(params);
  },
  CallGetCockfightingBetList(params: IGetBetListRequest): IAxiosPromise<IGetBetListResponse> {
    return api.post('/game-provider/v2/get-cock-fighting-bet-list', params);
    // return FakeAPI.getCockfightingBetList(params);
  },
  CallGetPokerBetList(params: IGetBetListRequest): IAxiosPromise<IGetBetListResponse> {
    return api.post('/game-provider/v2/get-poker-bet-list', params);
    // return FakeAPI.getCockfightingBetList(params);
  },
  CallGetSportsBetList(params: IGetSportBetRequest): IAxiosPromise<IGetSportBetResponse> {
    return api.post('/game-provider/v2/get-sports-bet-list', params);
    // return FakeAPI.getSportsBetList(params);
  },
  CallGetVirtualSportsBetList(params: IGetSportBetRequest): IAxiosPromise<IGetSportBetResponse> {
    return api.post('/game-provider/v2/get-virtual-sports-bet-list', params);
    // return FakeAPI.getVirtualSportsBetList(params);
  },
  CallGetGamesProviders(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-games-providers', {});
    // return FakeAPI.getGamesProviders();
  },
  CallGetCasinoProviders(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-casino-providers', {});
    // return FakeAPI.getCasinoProviders();return FakeAPI.getCasinoProviders();
  },
  CallGetSportProvider(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-sport-providers', {});
    // return FakeAPI.getSportProvider();
  },
  CallGetVirtualSportProvider(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-virtual-sport-providers', {});
    // return FakeAPI.getVirtualSportProvider();
  },
  CallGetBetPayload(params: IGetBetPayloadRequest): IAxiosPromise<IGetBetPayloadResponse> {
    return api.post('game-provider/v2/bet-payload', params);
    // return FakeAPI.getBetPayLoad(params);
  },
  callGetCurrencyWhiteList(): IAxiosPromise<IGetCurrencyWhiteListResponse> {
    return bsiApi.post('/common/v2/restriction/get-currency-white-list', {
      Domain: window.location.hostname,
    });
    // return FakeAPI.getCurrencyWhiteList();
  },
  callGetCompanyFlowSetting(): IAxiosPromise<ICompanyFlowSettingResponse> {
    const request: ICompanyFlowSettingRequest = {
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      Type: 'RegisterPage',
      Domain: window.location.hostname,
      IsSettingForApp: false,
    };
    return bsiApi.post('/player/v2/get-company-flow-setting', request);
    // return FakeAPI.getCompanyFlowSetting(args);
  },
  callGetAccountCurrencyByUsername(username: string): IAxiosPromise<IGetAccountCurrencyByUsernameResponse> {
    const arg: IGetAccountCurrencyByUsernameRequest = {
      Domain: window.location.hostname,
      Username: username,
    };
    return bsiApi.post('/cash-agent/v2/get-account-currency-by-username', arg);
    // return FakeAPI.getAccountCurrencyByUsername(args);
  },
  callGetRegisterBankList(currency: string): IAxiosPromise<IGetRegisterBankListResponse> {
    const request: IGetRegisterBankListRequest = {
      Domain: window.location.hostname,
      Currency: currency,
    };
    return bsiApi.post('/player/v2/get-register-bank-list', request);
    // return FakeAPI.getRegisterBankList(args);
  },
  registerAccountViaCashAgent(args: IRegisterRequest): IAxiosPromise<IRegisterResponse> {
    return api.post('cash-agent/create-player', args);
    // return FakeAPI.register(args);
  },
  registerAccount(params: IRegisterRequest): IAxiosPromise<IRegisterResponse> {
    return bsiApi.post('/player/v2/register/join-now', params);
    // return FakeAPI.register(params);
  },
  CallGetGameProviderList(): IAxiosPromise<IGetGameProviderListResponse> {
    return bsiApi.post('/player/v2/get-game-provider-list', {
      Domain: window.location.hostname,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
    // return FakeAPI.getGameProviderList();
  },
  callGetTopGameList(): IAxiosPromise<IGetTopGameListResponse> {
    return bsiApi.post('/player/v2/get-top-game-list', {
      Domain: window.location.hostname,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
  },
  callGetNewGameList(): IAxiosPromise<IGetGameProviderListResponse> {
    return bsiApi.post('/player/v2/get-new-game-list', {
      Domain: window.location.hostname,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
  },
  CallGetGameProvider(provider: string): IAxiosPromise<IGetGameProviderListResponse> {
    return bsiApi.post('/player/v2/get-game-list-by-provider', {
      Domain: window.location.hostname,
      Provider: provider,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
  },
  CallGetGameListByGameType(gameType: string): IAxiosPromise<IGetGameProviderListResponse> {
    return bsiApi.post('/player/v2/get-game-list-by-game-type', {
      Domain: window.location.hostname,
      Category: gameType,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
  },
  CallGetGameTabProviderList(): IAxiosPromise<IGameTypeProviderList> {
    return bsiApi.post('/player/v2/get-game-tab-provider-list', {
      Domain: window.location.hostname,
      Currency: store.state.currency,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      IsBsi: !store.state.auth,
    });
  },
  CallGetMenuTab(): IAxiosPromise<IGetMenuTabResponse> {
    const request = {
      Domain: window.location.hostname,
      Lang: cookieHelper.getCookie('alanguage') ?? 'en',
    };
    let response = {} as IAxiosPromise;
    if (store.state.auth) {
      response = api.post('/player/v2/get-player-game-tab', request);
    } else {
      response = bsiApi.post('/player/get-bsi-game-tab', request);
    }
    return response;
  },
  CallGetLanguagesSetting(): IAxiosPromise<IGetLanguageSettingResponse> {
    return bsiApi.post('/appsettings/v2/get-language-setting', {
      Domain: window.location.hostname,
    });
    // return FakeAPI.getLanguageSetting();
  },
  CallGetMultiWallet(): IAxiosPromise<IGetMultiWalletBalaceResponse> {
    return api.post('/player/v2/get-all-wallet-balance', {});
    // return FakeAPI.getMultiWallet();
  },
  CallCheckHaveReferralPromotion(): IAxiosPromise<null> {
    return api.post('/player/v2/check-referral-event', {});
    // return FakeAPI.checkHaveReferralEvent();
  },
  getPlayerPreferenceForDisplay(): IAxiosPromise<IGetPlayerPreference> {
    return bsiApi.post('/theme/v2/get-preference-for-display', {
      Username: store.state.username,
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
      Domain: window.location.hostname,
    });
    // return FakeAPI.getPlayerPreferenceForDisplay();
  },
  // CallGetBsiGameList(): IAxiosPromise<IGetBsiGameListResponse> {
  //   // return bsiApi.post('/player/v2/get-bsi-game-list', {
  //   return bsiApi.post('/player/get-bsi-game-list', {
  //     // Domain: window.location.hostname,
  //     WebId: store.state.webId,
  //     Lang: cookieHelper.getCookie('alanguage') ?? 'en',
  //   });
  //   // return FakeAPI.getBsiGameList();
  // },
  CallGetPlayableGame(): IAxiosPromise<IGetBsiGameListResponse> {
    return bsiApi.post('/player/v2/get-playable-games', {
      Domain: window.location.hostname,
      Currency: store.state.currency,
      Lang: cookieHelper.getCookie('alanguage') ?? 'en',
    });
    // return FakeAPI.getPlayableGame();
  },
  CallGetWebIdByDomainName(): IAxiosPromise<IWebId> {
    return bsiApi.post('/player/get-webId-by-domain', {
      Domain: window.location.hostname,
    });
  },
  CallLogin(params: IRequestLogin): IAxiosPromise<GetLoginResponse> {
    return bsiApi.post('/player/login', params);
  },
  CallGameProviderLogin(GameId: number, EntranceLocation: string): IAxiosPromise<IGetGameProviderLoginResponse> {
    const params: IRequestGameProviderLogin = {
      GameId,
      Ip: store.state.ip,
      FromUrl: window.location.origin,
      IsFromMobile: Boolean(isMobile ? 1 : 0),
      EntranceLocation,
      Lang: cookieHelper.getCookie('alanguage') ?? 'en',
    };
    return api.post('/game-provider/v2/player-login', params);
  },
  CallGetReferralLayerAmount(): IAxiosPromise<IGetReferralLayerAmountResponse> {
    return api.post('/player/v2/referral/get-layer-amount', {});
    // return FakeAPI.getReferralLayerAmount();
  },
  CallGetRedeemReferralRequest(): IAxiosPromise<IGetRedeemReferralResponse> {
    return api.post('/player/v2/referral/get-redeem-requests', {});
    // return FakeAPI.getRedeemReferralRequest();
  },
  CallRedeemReferralAmount(request: IRedeemReferralAmountRequest): IAxiosPromise<IGetRedeemReferralResponse> {
    return api.post('/player/v2/referral/raise-redeem', request);
    // return FakeAPI.redeemReferralAmount(request);
  },
  CallGetReferralDiagram(request: IGetReferralDiagramRequest): IAxiosPromise<IGetReferralDiagramResponse> {
    return api.post('/player/v2/referral/get-diagram', request);
    // return FakeAPI.getReferralDiagram(request);
  },
  callGetStatement(args: IStatementRequest): IAxiosPromise<IStatementResponse> {
    return api.post('/player/v2/statement/get-winlose', args);
    // return FakeAPI.getStatement(args);
  },
  callGetWithdrawalFromGameProvider(): IAxiosPromise<null> {
    return api.post('/game-provider/v2/withdrawal-all', {
      WebId: store.state.webId,
      Username: store.state.username,
    });
    // return FakeAPI.getWithdrawalFromGameProvider();
  },
  callGetWhiteListedIpEnabled(): IAxiosPromise<IGetWhiteListedIps> {
    return bsiApi.post('/common/v2/restriction/is-whitelisted-ip', {
      Domain: window.location.hostname,
      IpAddress: store.state.ip,
    });
  },
  callGetCurrencies(): IAxiosPromise<IGetCurrencies> {
    return bsiApi.post('/player/v2/get-player-currency-list', {
      Domain: window.location.hostname,
    });
  },
  callGetPlayerIsOnline(params: IRequestPlayerIsOnline): IAxiosPromise<IBaseResponse> {
    return api.post('/player/is-online', params);
  },
  callGetPromotions(currency: string): IAxiosPromise<IGetPromotionResponse> {
    const params: IRequestPromotion = {
      Domain: window.location.hostname,
      Currency: store.state.auth ? store.state.currency : currency,
    };
    return api.post('/player/v2/get-promotions', params);
    // return FakeAPI.getPromotions();
  },
  CallApplyPromotion(promotionId: number): IAxiosPromise<IBaseResponse> {
    const request: IPromotionApplyReqeust = {
      WebId: store.state.webId,
      CustomerId: store.state.customerId,
      PromotionId: promotionId,
      Ip: store.state.ip,
    };
    return api.post('/player/apply-promotion', request);
    // return FakeAPI.postApplyPromotion(request);
  },
  CallGetLotteryBetList(params: IGetBetListRequest): IAxiosPromise<IGetBetListResponse> {
    return api.post('/game-provider/v2/get-lottery-bet-list', params);
    // return FakeAPI.getLotteryBetList(params);
  },
  CallGetCockfightProviders(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-cockfighting-providers', {});
  },
  CallGetPokerProviders(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-poker-providers', {});
  },
  CallGetLotteryProviders(): IAxiosPromise<IGameProviders> {
    return api.post('/game-provider/v2/get-lottery-providers', {});
  },
  CallGetCreatePromotionDetails(): IAxiosPromise<IGetCreatePromotionDetailsResponse> {
    return api.post('/back-office/promotion/get-create-promotion-details', {
      WebId: store.state.webId,
    });
  },
  callAgentCooperation(request: IFormAgentCooperation): IAxiosPromise<IGetCreatePromotionDetailsResponse> {
    return api.post('/cash-agent/v2/request-become-to-cash-agent', {
      Domain: window.location.hostname,
      ...request,
    });
  },
  callCheckIsPlayerSite(): IAxiosPromise<IBaseResponse> {
    return bsiApi.post('/player/v2/check-is-playersite-um', {
      Domain: window.location.hostname,
    });
  },
  callRecommendMatches(): IAxiosPromise<IRecommendMatchResponse> {
    return bsiApi.post('/player/game/sportsbook/recommend-matches', {
      Language: cookieHelper.getCookie('alanguage') ?? 'en',
    });
    // return FakeAPI.recommendMatches();
  },
  callLoginByMatchId(request: ILoginByMatchIdRequest): IAxiosPromise<ILoginByMatchIdResponse> {
    return api.post('/player/game/v2/sportsbook/login-by-matchid', request);
    // return FakeAPI.loginByMatchId(request);
  },
};
