const _0x54308b=_0x2027;(function(_0x3938ba,_0x3664da){const _0x12c3e8=_0x2027,_0x2c1019=_0x3938ba();while(!![]){try{const _0x2fc59b=parseInt(_0x12c3e8(0x170))/0x1*(-parseInt(_0x12c3e8(0x174))/0x2)+parseInt(_0x12c3e8(0x17f))/0x3+-parseInt(_0x12c3e8(0x175))/0x4*(-parseInt(_0x12c3e8(0x171))/0x5)+parseInt(_0x12c3e8(0x17d))/0x6+parseInt(_0x12c3e8(0x16c))/0x7+-parseInt(_0x12c3e8(0x176))/0x8+-parseInt(_0x12c3e8(0x17e))/0x9;if(_0x2fc59b===_0x3664da)break;else _0x2c1019['push'](_0x2c1019['shift']());}catch(_0x382fe9){_0x2c1019['push'](_0x2c1019['shift']());}}}(_0x18fe,0x3f490));function _0x18fe(){const _0x17cab4=['2644698cwaRIg','NodeIKernelBuddyService/getBuddyList','push','uid','1DKdPgx','10265orwozN','getBuddyService','session','433934PPoqnF','676QzmubI','3136064QuLBNf','CallNormalEvent','NodeIKernelBuddyListener/onBuddyListChange','handleFriendRequest','uin','friendUid','reqTime','2657202GNINGF','6500007FlWXem','1268328akACBX','CCtgM','buddyList'];_0x18fe=function(){return _0x17cab4;};return _0x18fe();}import{napCatCore}from'@/core';import{uid2UinMap}from'@/core/data';function _0x2027(_0x37d829,_0x306944){const _0x18fe65=_0x18fe();return _0x2027=function(_0x202798,_0x4b18fb){_0x202798=_0x202798-0x16a;let _0x346a1f=_0x18fe65[_0x202798];return _0x346a1f;},_0x2027(_0x37d829,_0x306944);}import{NTEventDispatch}from'@/common/utils/EventTask';export class NTQQFriendApi{static async['getFriends'](_0x5829ad=![]){const _0x5daa15=_0x2027,_0x893f0a={'CCtgM':_0x5daa15(0x16d)};let [_0x4f3279,_0x3bacac]=await NTEventDispatch[_0x5daa15(0x177)](_0x893f0a[_0x5daa15(0x16a)],_0x5daa15(0x178),0x1,0x1388,_0x5829ad);const _0x24a08f=[];for(const _0x32e15d of _0x3bacac){for(const _0x423444 of _0x32e15d[_0x5daa15(0x16b)]){_0x24a08f[_0x5daa15(0x16e)](_0x423444),uid2UinMap[_0x423444[_0x5daa15(0x16f)]]=_0x423444[_0x5daa15(0x17a)];}}return _0x24a08f;}static async[_0x54308b(0x179)](_0x54bc41,_0x1803b7){const _0x1230ab=_0x54308b;napCatCore[_0x1230ab(0x173)][_0x1230ab(0x172)]()?.['approvalFriendRequest']({'friendUid':_0x54bc41[_0x1230ab(0x17b)],'reqTime':_0x54bc41[_0x1230ab(0x17c)],'accept':_0x1803b7});}}