/** 用户登录接口返回的数据 */
export interface User {
    /**
     * 用户名
     */
    account?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 用户id
     */
    id?: string;
    /**
     * 脱敏手机号，带星号的手机号
     */
    mobile?: string;
    /**
     * refreshToken
     */
    refreshToken?: string;
    /**
     * token
     */
    token?: string;
    /**
    * 收藏
    */
    collectionNumber?: number;
    /**
    * 关注
    */
    likeNumber?: number;
    /**
    * 积分
    */
    score?: number;
    /**
    * 优惠券
    */
    couponNumber?: number;
    orderInfo?: {
        /**
         * 待付款
         * */
        paidNumber?: number;
        /**
         * 待发货
         * */
        shippedNumber?: number;
        /**
         * 待收货
         * */
        receivedNumber?: number;
        /**
         * 已完成
         * */
        refund?: number;
        finishedNumber?: number;
    };
}
export interface Patient {
    // 患者id
    id?: string;
    name?: string;
    idCard?: string
    genderValue?: string
    age?: number
    defaultFlag?: number
    gender?: number
}

export interface AddPatient {
    name: string;
    idCard: string
    defaultFlag: number
    gender: number
}
export type IAddPatient = Pick<
    Patient,
    "name" | "idCard" | "gender" | "defaultFlag"
> & { id?: string };