/* eslint-disable import/no-cycle */
import { GetProfileResponse } from '@/models/getProfileResponse';
import ApiResponse from '@/models/apiResponse';
import { GetBalanceResponse } from '@/models/getBalanceResponse';
import apiCalling from './apiCalling';
import { IBaseResponse, INullDataResponse } from '@/models/baseResponse';
import IGetPreferenceForSettingsResponse from '@/models/getPreferenceForSettingsResponse';
import { IAxiosPromise } from '@/models/axiosPromise';
import EnumDisplayTimeOption from '@/models/enums/enumDisplayTimeOption';
import { GetPaymentGatewayBanksResponse } from '@/models/getPaymentGatewayBanksRespone';
import { IGetTransactionBankListResponse } from '@/models/getTransactionBankListResponse';
import {
  IRequestDepositBankTransfer,
  IRequestDepositInternetBank,
  IGetDepositInternetBankReponse,
  IRequestAutoDepositBankTransfer,
} from '@/models/requestDepositBanks';
import { IFeaturesToggleRespone } from '@/models/featuresToggleRespone';
import {
  IRequestWithdrawalBankTransfer,
  IRequestWithdrawalInternetBank,
  IGetWithdrawalInternetBankReponse,
  IRequestSetPaymentPassword,
} from '@/models/requestWithdrawalBankTransfer';
import { IRequestTransactionFee } from '@/models/requestTransactionFee';
import { IGetTransactionFeeResponse } from '@/models/getTransactionFeeResponse';
import { GetTransactionHistoryResponse, GetTransactionHistoryRequest, IProceedTransactionRequest } from '@/models/getTransactionHistoryResponse';
import { ICustomerSettingResponse } from '@/models/getCustomerSettingResponse';
import { IGetManualCryptoCurrencyTransactionResponse, IRequestManualCryptoCurrencyDeposit } from '@/models/getManualCryptoCurrencyTransactionResponse';
import { GetThemePropertiesRequestDto, ICompanyThemePropertiesFromApi, ThemePropertiesFromApiDto } from '@/models/companyThemePropertiesRespone';
import IGetBetListRequest from '@/models/getBetListRequest';
import { IGetBetListResponse, GetBetListResponse } from '@/models/getBetListResponse';
import IGetPromotionApplyListRequest from '@/models/promotion/getPromotionApplyListRequest';
import IGetPromotionApplyListResponse, { GetPromotionApplyListResponse } from '@/models/promotion/getPromotionApplyListResponse';
import { IGameProviders } from '@/models/gameProvider';
import IGetBetPayloadRequest from '@/models/getBetPayloadRequest';
import IGetBetPayloadResponse from '@/models/getBetPayloadResponse';
import IGetSportBetRequest from '@/models/sportbet/getSportBetRequest';
import { IGetSportBetResponse, GetSportBetResponse } from '@/models/sportbet/getSportBetResponse';
import { IGetAccountCurrencyByUsernameResponse, IGetCurrencyWhiteListResponse } from '@/models/currencyWhiteList';
import { CompanyFlowSettingResponse, ICompanyFlowSettingResponse } from '@/models/companyFlowSetting';
import { IGetRegisterBankListResponse } from '@/models/bank';
import { IRegisterRequest, GetRegisterResponse } from '@/models/register';
import { IGetTopGameListResponse, IGetGameProviderListResponse } from '@/models/IGetPlayableGamesResponse';
import { IGetLanguageSettingResponse } from '@/models/common/language';
import IGetPlayerPreference from '@/models/getPlayerPreference';
import { IGetMultiWalletBalaceResponse } from '@/models/common/wallet';
import {
  GetBsiGameListResponse, IGameTypeProviderList,
  IGetMenuTabResponse,
} from '@/models/bsiGameList';
import { IGetGameProviderLoginResponse } from '@/models/gameProviderLogin';
import {
  IRequestLogin,
  GetLoginResponse,
  IGetWhiteListedIps,
  IGetCurrencies,
  IRequestPlayerIsOnline,
} from '@/models/login';
import { IWebId } from '@/models/webId';
import cookieHelper from './cookieHelper';
import {
  IGetRedeemReferralResponse,
  IGetReferralDiagramRequest,
  IGetReferralDiagramResponse,
  IRedeemReferralAmountRequest,
  GetReferralLayerAmountResponse,
  GetRedeemReferralResponse,
} from '@/models/referral/getReferral';
import { IStatementResponse, IStatementRequest, StatementResponse } from '@/models/statement';
import { GetPromotionResponse, IGetPromotionResponse } from '@/models/promotion/promotion';
import EnumApiErrorCode from '@/models/enums/enumApiErrorCode';
import { IFormAgentCooperation } from '@/models/agentCooperation';
import {
  ILoginByMatchIdRequest,
  ILoginByMatchIdResponse,
  IRecommendMatch,
  IRecommendMatchResponse,
  RecommendMatch,
} from '@/models/theme/popular_match/popularMatch';

const getResponse = (response: IAxiosPromise) => response.then((value) => new ApiResponse(value.data));

export default {
  getProfileInformation(): Promise<ApiResponse<GetProfileResponse>> {
    const response = getResponse(apiCalling.callGetProfileInformation());

    return response.then((value) => {
      value.Data = new GetProfileResponse(value.Data);
      return value;
    });
  },
  getPlayerBalance(): Promise<ApiResponse<GetBalanceResponse>> {
    const response = getResponse(apiCalling.callGetPlayerBalance());

    return response.then((value) => {
      value.Data = new GetBalanceResponse(value.Data);
      return value;
    });
  },
  getAllWalletsBalance(): Promise<ApiResponse<GetBalanceResponse>> {
    const response = getResponse(apiCalling.callGetAllWalletsBalance());

    return response.then((value) => {
      value.Data = new GetBalanceResponse(value.Data);
      return value;
    });
  },
  changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callChangePassword(oldPassword, newPassword);
    return getResponse(response);
  },
  changePaymentPassword(oldPassword: string, newPassword: string): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callChangePaymentPassword(oldPassword, newPassword);
    return getResponse(response);
  },
  getPreferenceSetting(): Promise<ApiResponse<IGetPreferenceForSettingsResponse>> {
    const response = apiCalling.callGetPreferenceSetting();
    return getResponse(response);
  },
  updatePlayerPreference(displayTime: EnumDisplayTimeOption): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callUpdatePlayerPreference(displayTime);
    return getResponse(response);
  },
  async renewToken(): Promise<void> {
    const response = await apiCalling.callRenewToken();
    apiCalling.renewAxiosInstanceToken(response.data.Data.Token);
  },
  getTransactionBankList(RequestPageType : string): Promise<ApiResponse<IGetTransactionBankListResponse>> {
    const response = apiCalling.callGetTransactionBankList(RequestPageType);
    return getResponse(response);
  },
  getPaymentGatewayBanks(): Promise<ApiResponse<GetPaymentGatewayBanksResponse>> {
    const response = getResponse(apiCalling.callgetPaymentGatewayBanks());
    return response.then((value) => {
      value.Data = new GetPaymentGatewayBanksResponse(value.Data);
      return value;
    });
  },
  proceedDepositBankTransfer(params: IRequestDepositBankTransfer): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callProceedDepositBankTransfer(params);
    return getResponse(response);
  },

  proceedDepositInternetBank(params: IRequestDepositInternetBank): Promise<ApiResponse<IGetDepositInternetBankReponse>> {
    const response = apiCalling.callProceedDepositInternetBank(params);
    return getResponse(response);
  },
  proceedAutoDeposit(param: IRequestAutoDepositBankTransfer): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callProceedAutoDepositBankTransfer(param);
    return getResponse(response);
  },
  uploadFile(files: File[], folder: string): Promise<ApiResponse<IBaseResponse>> {
    const form = new FormData();
    files.forEach((file) => {
      form.append('file', file);
    });
    form.append('folder', folder);
    const response = apiCalling.callUploadFile(form);
    return getResponse(response);
  },
  getFeaturesToggle(): Promise<ApiResponse<IFeaturesToggleRespone>> {
    const response = apiCalling.callGetFeaturesToggle();
    return getResponse(response);
  },
  withdrawalBankTransfer(params: IRequestWithdrawalBankTransfer): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callWithdrawalBankTransfer(params);
    return getResponse(response);
  },
  getTransactionFee(params: IRequestTransactionFee): Promise<ApiResponse<IGetTransactionFeeResponse>> {
    const response = apiCalling.callGetTransactionFee(params);
    return getResponse(response);
  },
  withdrawalInternetBank(params: IRequestWithdrawalInternetBank): Promise<ApiResponse<IGetWithdrawalInternetBankReponse>> {
    const response = apiCalling.callWithdrawalInternetBank(params);
    return getResponse(response);
  },
  setPaymentPassword(params: IRequestSetPaymentPassword): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callSetPaymentPassword(params);
    return getResponse(response);
  },
  getTransactionHistory(params: GetTransactionHistoryRequest): Promise<ApiResponse<GetTransactionHistoryResponse>> {
    const response = getResponse(apiCalling.callGetTransactionHistory(params));
    return response.then((value) => {
      if (value.Data) {
        value.Data = new GetTransactionHistoryResponse(value.Data);
      }
      return value;
    });
  },
  proceedTransaction(params : IProceedTransactionRequest): Promise<ApiResponse<INullDataResponse>> {
    const response = apiCalling.callProceedTransaction(params);
    return getResponse(response);
  },
  getCustomerSetting(RequestId: string): Promise<ApiResponse<ICustomerSettingResponse>> {
    const response = apiCalling.callGetCustomerSetting(RequestId);
    return getResponse(response);
  },
  getManualCryptoCurrencyTransaction(RequestPageType : string): Promise<ApiResponse<IGetManualCryptoCurrencyTransactionResponse>> {
    const response = apiCalling.callGetManualCryptoCurrencyTransaction(RequestPageType);
    return getResponse(response);
  },
  proceedManualCryptoCurrencyDeposit(params: IRequestManualCryptoCurrencyDeposit): Promise<ApiResponse<IBaseResponse>> {
    const response = apiCalling.callProceedManualCryptoCurrencyDeposit(params);
    return getResponse(response);
  },
  getThemeProperties(params: GetThemePropertiesRequestDto): Promise<ApiResponse<ICompanyThemePropertiesFromApi>> {
    const response = apiCalling.callGetThemeProperties(params);
    return getResponse(response).then((value) => {
      value.Data.ThemeProperties = value.Data.ThemeProperties.map((themeProperty: ThemePropertiesFromApiDto) => new ThemePropertiesFromApiDto(themeProperty));
      return value;
    });
  },
  getPromotionApplyList(params: IGetPromotionApplyListRequest): Promise<ApiResponse<IGetPromotionApplyListResponse>> {
    const response = getResponse(apiCalling.callGetPromotionApplyList(params));
    return response.then((value) => {
      value.Data = new GetPromotionApplyListResponse(value.Data);
      return value;
    });
  },
  getGamesBetList(params: IGetBetListRequest): Promise<ApiResponse<IGetBetListResponse>> {
    const response = apiCalling.CallGetGameBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetBetListResponse(value.Data);
      return value;
    });
  },
  getCasinoBetList(params: IGetBetListRequest): Promise<ApiResponse<IGetBetListResponse>> {
    const response = apiCalling.CallGetCasinoBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetBetListResponse(value.Data);
      return value;
    });
  },
  getCockfightingBetList(params: IGetBetListRequest): Promise<ApiResponse<IGetBetListResponse>> {
    const response = apiCalling.CallGetCockfightingBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetBetListResponse(value.Data);
      return value;
    });
  },
  getPokerBetList(params: IGetBetListRequest): Promise<ApiResponse<IGetBetListResponse>> {
    const response = apiCalling.CallGetPokerBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetBetListResponse(value.Data);
      return value;
    });
  },
  getSportsbetList(params: IGetSportBetRequest): Promise<ApiResponse<IGetSportBetResponse>> {
    const response = apiCalling.CallGetSportsBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetSportBetResponse(value.Data);
      return value;
    });
  },
  getVirtualSportsbetList(params: IGetSportBetRequest): Promise<ApiResponse<IGetSportBetResponse>> {
    const response = apiCalling.CallGetVirtualSportsBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetSportBetResponse(value.Data);
      return value;
    });
  },
  getGamesProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetGamesProviders());
    return response;
  },
  getCasinoProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetCasinoProviders());
    return response;
  },
  getSportProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetSportProvider());
    return response;
  },
  getVirtualSportProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetVirtualSportProvider());
    return response;
  },
  getBetPayload(params: IGetBetPayloadRequest): Promise<ApiResponse<IGetBetPayloadResponse>> {
    const response = getResponse(apiCalling.CallGetBetPayload(params));
    return response;
  },
  getCurrencyWhiteList(): Promise<ApiResponse<IGetCurrencyWhiteListResponse>> {
    const response = getResponse(apiCalling.callGetCurrencyWhiteList());
    return response;
  },
  getCompanyFlowSetting(): Promise<ApiResponse<ICompanyFlowSettingResponse>> {
    const response = getResponse(apiCalling.callGetCompanyFlowSetting());
    return response.then((value) => {
      value.Data = new CompanyFlowSettingResponse(value.Data);
      return value;
    });
  },
  getAccountCurrencyByUsername(username: string): Promise<ApiResponse<IGetAccountCurrencyByUsernameResponse>> {
    const response = getResponse(apiCalling.callGetAccountCurrencyByUsername(username));
    return response;
  },
  getRegisterBankList(currency: string): Promise<ApiResponse<IGetRegisterBankListResponse>> {
    const response = getResponse(apiCalling.callGetRegisterBankList(currency));
    return response;
  },
  registerAccountViaCashAgent(args: IRegisterRequest): Promise<ApiResponse<GetRegisterResponse>> {
    const response = getResponse(apiCalling.registerAccountViaCashAgent(args));
    return response;
  },
  registerAccount(args: IRegisterRequest): Promise<ApiResponse<GetRegisterResponse>> {
    const response = getResponse(apiCalling.registerAccount(args));
    return response;
  },
  getGameProviderList(): Promise<ApiResponse<IGetGameProviderListResponse>> {
    const response = getResponse(apiCalling.CallGetGameProviderList());
    return response;
  },
  getTopGameList(): Promise<ApiResponse<IGetTopGameListResponse>> {
    const response = getResponse(apiCalling.callGetTopGameList());
    return response;
  },
  getNewGameList(): Promise<ApiResponse<IGetGameProviderListResponse>> {
    const response = getResponse(apiCalling.callGetNewGameList());
    return response;
  },
  getGameListByProvider(provider: string): Promise<ApiResponse<IGetGameProviderListResponse>> {
    const response = getResponse(apiCalling.CallGetGameProvider(provider));
    return response;
  },
  getGameListByGameType(gameType: string): Promise<ApiResponse<IGetGameProviderListResponse>> {
    const response = getResponse(apiCalling.CallGetGameListByGameType(gameType));
    return response;
  },
  getGameTabProviderList(): Promise<ApiResponse<IGameTypeProviderList>> {
    const response = getResponse(apiCalling.CallGetGameTabProviderList());
    return response;
  },
  getMenuTab(): Promise<ApiResponse<IGetMenuTabResponse>> {
    const response = getResponse(apiCalling.CallGetMenuTab());
    return response;
  },
  getLanguageSetting(): Promise<ApiResponse<IGetLanguageSettingResponse>> {
    const response = getResponse(apiCalling.CallGetLanguagesSetting());
    return response;
  },
  getPlayerPreferenceForDisplay(): Promise<ApiResponse<IGetPlayerPreference>> {
    const response = getResponse(apiCalling.getPlayerPreferenceForDisplay());
    return response;
  },
  getMultiWallets(): Promise<ApiResponse<IGetMultiWalletBalaceResponse>> {
    const response = getResponse(apiCalling.CallGetMultiWallet());
    return response;
  },
  getCheckHaveReferralPromotion(): Promise<ApiResponse<null>> {
    const response = getResponse(apiCalling.CallCheckHaveReferralPromotion());
    return response;
  },
  // getBsiGameList(): Promise<ApiResponse<GetBsiGameListResponse>> {
  //   const response = getResponse(apiCalling.CallGetBsiGameList());
  //   return response.then((value) => {
  //     value.Data = new GetBsiGameListResponse(value.Data);
  //     return value;
  //   });
  // },
  getPlayableGame(): Promise<ApiResponse<GetBsiGameListResponse>> {
    const response = getResponse(apiCalling.CallGetPlayableGame());
    return response.then((value) => {
      value.Data = new GetBsiGameListResponse(value.Data);
      return value;
    });
  },
  getWebIdByDomainName(): Promise<ApiResponse<IWebId>> {
    const response = getResponse(apiCalling.CallGetWebIdByDomainName());
    return response;
  },
  getLogin(params: IRequestLogin): Promise<ApiResponse<GetLoginResponse>> {
    const response = apiCalling.CallLogin(params);
    return getResponse(response).then((value) => {
      if (value.ErrorCode === EnumApiErrorCode.success) {
        cookieHelper.setCookie('atoken', value.Data.Token, 60);
      }
      value.Data = new GetLoginResponse(value.Data);
      return value;
    });
  },
  getLogout(): void {
    cookieHelper.removeCookie('atoken');
    localStorage.removeItem('vuex');
    localStorage.removeItem('onlineId');
    const isMobile = window.location.href.indexOf('/v2/m/') > -1;
    const template = isMobile ? 'mobile' : 'desktop';
    const redirected = template === 'desktop' ? `${window.location.origin}/v2` : `${window.location.origin}/v2/m`;
    (<any> window).location = `${redirected}/Home`;
  },
  getGameProviderLogin(GameId: number, EntranceLocation: string): Promise<ApiResponse<IGetGameProviderLoginResponse>> {
    const response = getResponse(apiCalling.CallGameProviderLogin(GameId, EntranceLocation));
    return response;
  },
  getReferralLayerAmount(): Promise<ApiResponse<GetReferralLayerAmountResponse>> {
    const response = getResponse(apiCalling.CallGetReferralLayerAmount());
    return response.then((res) => {
      res.Data = new GetReferralLayerAmountResponse(res.Data);
      return res;
    });
  },
  getRedeemReferralRequest(): Promise<ApiResponse<GetRedeemReferralResponse>> {
    const response = getResponse(apiCalling.CallGetRedeemReferralRequest());
    return response.then((res) => {
      res.Data = new GetRedeemReferralResponse(res.Data);
      return res;
    });
  },
  getRedeemReferralAmountCallRedeemReferralAmount(request: IRedeemReferralAmountRequest): Promise<ApiResponse<IGetRedeemReferralResponse>> {
    const response = getResponse(apiCalling.CallRedeemReferralAmount(request));
    return response;
  },
  getReferralDiagram(request: IGetReferralDiagramRequest): Promise<ApiResponse<IGetReferralDiagramResponse>> {
    const response = getResponse(apiCalling.CallGetReferralDiagram(request));
    return response;
  },
  getStatement(args: IStatementRequest): Promise<ApiResponse<IStatementResponse>> {
    const response = apiCalling.callGetStatement(args);
    return getResponse(response).then((value) => {
      value.Data = new StatementResponse(value.Data);
      return value;
    });
  },
  getWithdrawalFromGameProvider(): Promise<ApiResponse<null>> {
    const response = getResponse(apiCalling.callGetWithdrawalFromGameProvider());
    return response;
  },
  getWhiteListedIpEnabled(): Promise<ApiResponse<IGetWhiteListedIps>> {
    const response = getResponse(apiCalling.callGetWhiteListedIpEnabled());
    return response;
  },
  getCurrencies(): Promise<ApiResponse<IGetCurrencies>> {
    const response = getResponse(apiCalling.callGetCurrencies());
    return response;
  },
  getPlayerIsOnline(params: IRequestPlayerIsOnline): Promise<ApiResponse<IBaseResponse>> {
    const response = getResponse(apiCalling.callGetPlayerIsOnline(params));
    return response;
  },
  getPromotions(currency: string): Promise<ApiResponse<IGetPromotionResponse>> {
    const response = getResponse(apiCalling.callGetPromotions(currency));
    return response.then((res) => {
      res.Data = new GetPromotionResponse(res.Data);
      return res;
    });
  },
  applyPromotion(promotionId: number): Promise<ApiResponse<IBaseResponse>> {
    const response = getResponse(apiCalling.CallApplyPromotion(promotionId));
    return response;
  },
  getLotteryBetList(params: IGetBetListRequest): Promise<ApiResponse<IGetBetListResponse>> {
    const response = apiCalling.CallGetLotteryBetList(params);
    return getResponse(response).then((value) => {
      value.Data = new GetBetListResponse(value.Data);
      return value;
    });
  },
  getCockfightProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetCockfightProviders());
    return response;
  },
  getPokerProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetPokerProviders());
    return response;
  },
  getLotteryProvider(): Promise<ApiResponse<IGameProviders>> {
    const response = getResponse(apiCalling.CallGetLotteryProviders());
    return response;
  },
  getCreatePromotionDetails(): Promise<ApiResponse<IGetCreatePromotionDetailsResponse>> {
    const response = getResponse(apiCalling.CallGetCreatePromotionDetails());
    return response;
  },
  createAgentCooperation(request: IFormAgentCooperation): Promise<ApiResponse<IGetCreatePromotionDetailsResponse>> {
    const response = getResponse(apiCalling.callAgentCooperation(request));
    return response;
  },
  checkIsPlayerSiteUm(): Promise<ApiResponse<IBaseResponse>> {
    const response = getResponse(apiCalling.callCheckIsPlayerSite());
    return response;
  },
  recommendMatches(): Promise<ApiResponse<IRecommendMatchResponse>> {
    const response = getResponse(apiCalling.callRecommendMatches());
    return response.then((res) => {
      res.Data.RecommendMatches = res.Data.RecommendMatches.map((item: IRecommendMatch) => new RecommendMatch(item));
      return res;
    });
  },
  loginByMatchId(request: ILoginByMatchIdRequest): Promise<ApiResponse<ILoginByMatchIdResponse>> {
    const response = getResponse(apiCalling.callLoginByMatchId(request));
    return response;
  },
};
