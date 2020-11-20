<template>
<view class="minHeight">
	<status-bar background="#1762E6"></status-bar>
	<!-- <topNav backIcon="white" bgColor="#1762E6"></topNav> -->
	<view class="backBox fixed flexbetween" :style="'top:'+statusBar+'px;background:#1762E6'">
		<view class="goBack flexCC" @click="goBack">
			<!-- <image src="../../static/back.png" mode="widthFix" v-if="backIcon=='white'"></image>
			<image src="../../static/back2.png" mode="widthFix" v-if="backIcon=='black'"></image> -->
			<view class="iconfont icon-left" style="font-size: 22px;color: #fff;"></view>
		</view>
		<view class="title">{{title}}</view>
		<view class="goBack Right flexCC" v-if="rightCoinName!=''" @click="clickFun">
			<image :src="imgSrc" mode="widthFix" style="width: 40rpx;height: 44rpx;"></image>
		</view>
	</view>
	<view class="backBox"></view>
	
	<view class="subTop fixed" :style="'top:'+(statusBar+44)+'px'">
		<view class="topTitle">
			<label>{{$lang.subscribe.title}}</label>
			<view  @click="linkTo('/pages/index/subscribe/subscribeList', true);">{{$lang.subscribe.list}} <image src="../../../static/right.png" mode="widthFix"></image></view>
		</view>
		<view style="display: flex;">
			<view class="topsItem">
				<label>{{$lang.subscribe.validNum}}（T）</label>
				<view>{{ipfsInfo?ipfsInfo.validNum:0}}</view>
			</view>
			<view class="topsItem">
				<label>{{$lang.subscribe.invalidNum}}（T）</label>
				<view>{{ipfsInfo?ipfsInfo.invalidNum:0}}</view>
			</view>
			<view class="topsItem textR">
				<label>{{$lang.subscribe.income}}（FIL）</label>
				<view>{{ipfsInfo?ipfsInfo.income:0.00}}</view>
			</view>
		</view>
	</view>
	<view class="subTop" style="background-color: transparent;"></view>
	
	<view class="top-ipfs-content">
		<view class="top-ipfs-project">
			<view class="top-ipfs-project-title">
				<view class="top-ipfs-box-title">{{$lang.subscribe.dkYun}}</view>
				<view class="top-ipfs-project-income flex flex_ac">{{$lang.subscribe.h_income}}
					<image @click="showNotice($lang.subscribe.showTxt1)" src="../../../static/qq.png" mode="widthFix" style="width: 30px;height: 30px;margin-left: 5px"></image>
				</view>
			</view>
			<view class="top-ipfs-project-price">
				<view class="top-ipfs-project-price-new">{{$lang.subscribe.price1}}：￥1688 /T</view>
				<view class="top-ipfs-project-price-old">{{$lang.subscribe.price2}}：￥1888 /T</view>
			</view>
			<view class="top-ipfs-project-desc">{{$lang.subscribe.txt1}} ￥1350</view>
			<view class="top-ipfs-project-time">{{$lang.subscribe.txt2}}</view>
		</view>
		
		<view class="top-ipfs-form">
			<view class="top-ipfs-box-title">{{$lang.subscribe.formTitle}}：</view>
			<view class="top-ipfs-address-box" @click="$refs.bottomSel.open()">
				<view class="top-ipfs-address-title">{{$lang.subscribe.formItem1}}</view>
				<view style="display: flex;align-items: center;">
					<view style="height: 22px;flex:1;font-size: 14px;color: #1762e6;font-weight: bold;" :style="value!=''?'':'color: #C5CFD5'">
					{{value!=''?selObj[value-1].text:$lang.subscribe.formHolder1}}
					</view>
					<image src="../../../static/right.png" mode="widthFix" style="width: 7px;height: 14px;margin-left: 10px"></image>
				</view>
			</view>
			<view class="top-ipfs-input-box">
				<view class="top-ipfs-desc-title">{{$lang.subscribe.formItem2}}：</view>
				<view class="top-ipfs-input-child">
					<input :placeholder="$lang.subscribe.formHolder2" type="number" v-model="subscribeNum"  @input="inputNumFun"/>
					<label>T</label></view>
				<view class="top-ipfs-input-line"></view>
			</view>
			
			<view class="top-ipfs-input-box" v-if="value==2">
				<view class="top-ipfs-desc-title">{{$lang.subscribe.formItem3}}：</view>
				<view class="top-ipfs-input-child">
					<input :placeholder="$lang.subscribe.formHolder3" type="text" value=""/>
					<label></label>
				</view>
				<view class="top-ipfs-input-line"></view>
			</view>
			<view class="top-ipfs-input-box" v-if="value==2">
				<view class="top-ipfs-desc-title">{{$lang.subscribe.formItem4}}：</view>
				<view class="top-ipfs-input-child">
					<input :placeholder="$lang.subscribe.formHolder4" type="text" value=""/>
					<label></label>
				</view>
				<view class="top-ipfs-input-line"></view>
			</view>
			<view class="top-ipfs-input-box" v-if="value==2">
				<view class="top-ipfs-desc-title">{{$lang.subscribe.formItem5}}：</view>
				<view class="top-ipfs-input-child">
					<input :placeholder="$lang.subscribe.formHolder5" type="text" value=""/>
					<label></label>
				</view>
				<view class="top-ipfs-input-line"></view>
			</view>
			<view class="top-ipfs-input-box" v-if="value==2">
				<view class="top-ipfs-desc-title">{{$lang.subscribe.formItem6}}：</view>
				<view class="top-ipfs-input-child">
					<input :placeholder="$lang.subscribe.formHolder6" type="text" value=""/>
					<label></label>
				</view>
				<view class="top-ipfs-input-line"></view>
			</view>
			<view class="top-ipfs-calcusdt" style="color: #1762E6;font-size: 14px">
				<checkbox-group @change="handleFun">
						<label class="flex flex_ac"><checkbox :checked="checkBox"  value="hide" style="transform:scale(0.7)" /> {{$lang.subscribe.protocol}} </label>
				</checkbox-group>
			</view>


			<view class="top-ipfs-form-submit " style="font-size: 16px;" :class="{'top-ipfs-submit-disable':!checkBox}" @click="submit">{{$lang.subscribe.btn}}</view>
		</view>

		<view class="top-ipfs-wechat-tip">
			<label>{{$lang.subscribe.contact}}：
				<text>x8584853669</text>
				<image @click="copy('x8584853669')" src="../../../static/copy.png" mode="widthFix" style="width: 16px; margin-left: 10px;"></image>
			</label>
		</view>
		<view class="top-ipfs-step">
			<view class="top-ipfs-box-title">{{$lang.subscribe.stepTitle}}：</view>
			<view class="top-ipfs-step-title">
				<view>1</view>
				<label>{{$lang.subscribe.step1}}</label></view>
			<view class="top-ipfs-step-content">
				<view>{{$lang.subscribe.cont1}}</view>
			</view>
			<view class="top-ipfs-step-title">
				<view>2</view>
				<label>{{$lang.subscribe.cont2}}</label></view>
			<view class="top-ipfs-step-content">
				<view>{{$lang.subscribe.step3}}：</view>
				<view class="top-ipfs-step-off" style="margin-top: 10px;">
					<view class="top-ipfs-step-off-copy" style="margin-bottom: 10px;">
						<label>赣州银行股份有限公司青云谱支行</label>
					</view>
					<view class="top-ipfs-step-off-copy" style="margin-bottom: 10px;">
						<label>2806600103010000412</label>
						<image @click="copy('2806600103010000412')" src="../../../static/copy.png" mode="widthFix" style="width: 16px;"></image>
					</view>
					<view class="top-ipfs-step-off-copy">
						<label>江西达客互联网科技有限公司</label> 
						<image  @click="copy('江西达客互联网科技有限公司')" src="../../../static/copy.png" mode="widthFix" style="width: 16px;"></image>
					</view>
				</view>

			</view>
			<view class="top-ipfs-step-title">
				<view>3</view>
				<label>{{$lang.subscribe.step3}}</label>
			</view>
			<view class="top-ipfs-step-content">
				<view>{{$lang.subscribe.cont3}}</view>
				<label class="top-ipfs-offcial-tip">{{$lang.subscribe.cont4}}</label>
			</view>
		</view>
		<view class="top-ipfs-staking">
			<view class="top-ipfs-box-title">{{$lang.subscribe.tableTitle}}：</view>
			<table cellspacing="0">
				<thead>
					<tr>
						<th style="width: 24%; text-align: center;">{{$lang.subscribe.tableClomn1}}</th>
						<th style="width: 15%; text-align: center;">{{$lang.subscribe.tableClomn2}}</th>
						<th style="width: 25%; text-align: center;">{{$lang.subscribe.tableClomn3}}/T</th>
						<th style="text-align: center;">{{$lang.subscribe.tableClomn4}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>&lt;2000</td>
						<td>9</td>
						<td>￥1518</td>
						<td>原价1688 RMB</td>
					</tr>
					<tr>
						<td>2000-5000</td>
						<td>8.8</td>
						<td>￥1486</td>
						<td>
							<view class="flexCC">
								{{$lang.subscribe.bao}}
								<image @click="showNotice($lang.subscribe.showTableTxt1)" src="../../../static/qq.png" mode="widthFix" style="width: 40px;height: 40px;"></image>
							</view>
						</td>
					</tr>
					<tr>
						<td>5000-10000</td>
						<td>8.7</td>
						<td>￥1468</td>
						<td>
							<view class="flexCC">
								{{$lang.subscribe.bao}}
								<image @click="showNotice($lang.subscribe.showTableTxt2)" src="../../../static/qq.png" mode="widthFix" style="width: 40px;height: 40px;"></image>
							</view>
						</td>
					</tr>
					<tr>
						<td>10000-15000</td>
						<td>8.5</td>
						<td>￥1435</td>
						<td>
							<view class="flexCC">
								{{$lang.subscribe.bao}}
								<image  @click="showNotice($lang.subscribe.showTableTxt3)" src="../../../static/qq.png" mode="widthFix" style="width: 40px;height: 40px;"></image>
							</view>
						</td>
					</tr>
					<tr>
						<td>15000-20000</td>
						<td>8</td>
						<td>￥1350</td>
						<td>
							{{$lang.subscribe.bao100}}
							<image @click="showNotice($lang.subscribe.showTableTxt4)" src="../../../static/qq.png" mode="widthFix" style="width: 40px;height: 40px;"></image>
						</td>
					</tr>
					<tr>
						<td>&gt; 30000</td>
						<td>{{$lang.subscribe.quPrice}}</td>
						<td>{{$lang.subscribe.fuwu}}</td>
						<td>{{$lang.subscribe.bao100}}
							<image @click="showNotice($lang.subscribe.showTableTxt5)" src="../../../static/qq.png" mode="widthFix" style="width: 40px;height: 40px;"></image>
						</td>
					</tr>
				</tbody>
			</table>
		</view>
		<view class="top-ipfs-more" v-if="!showMore" @click="showMore=true">{{$lang.subscribe.showMore}}</view>
		<view class="top-ipfs-more-content" v-show="showMore">
			<view class="top-ipfs-service">
				<view class="top-ipfs-box-title">服务说明：</view>
				<view class="top-ipfs-desc-title">关于技术服务费</view>
				<view class="top-ipfs-desc-content">DK-IPFS云算力平台租赁服务将收取用户持有的有效算力挖矿产出FIL数量的20%作为技术服务费。技术服务费包括：矿场维护、矿机部署、矿机维修、技术服务、人力资源支出等费用。</view>

				<view class="top-ipfs-desc-title">关于产品期限</view>
				<view class="top-ipfs-desc-content">
					<label>1.产品有效期为365天（从主网上线后Filecoin云算力集群租赁服务产生挖矿产出之日开始计算）；</label>
					<label>2.租赁服务到期后自动终止并失效，平台将不再承担相关支持服务，用户所持有的Filecoin权益证明也将一并下架并失效；</label>
					<label>3.由于法律政策、战争、地震、火灾和电力故障等不可抗原因导致矿场无法继续运营时，产品服务提前终止，平台不承担赔偿责任。</label></view>

				<view class="top-ipfs-desc-title">关于挖矿产出与分配</view>
				<view class="top-ipfs-desc-content">
					<label>1.平台将根据Filecoin云算力集群租赁服务的实际挖矿产出进行分配；</label>
					<label>2.DK-IPFS云算力平台租赁服务所产生的挖矿产出以代币FIL的形式发放；</label>
					<label>3.北京时间次日24:00前分配前一天的FIL，最终以矿池的分配时间为准；</label>
					<label>4.用户持有的有效算力是指用户向DK-IPFS购买的Filecoin云算力已经完成封装的有效存储。由于Filecoin特殊的存储封装过程，用户向DK-IPFS购买的Filecoin云算力需要从主网上线开始（若用户购买云算力的时间在主网上线后，则从用户购买云算力之日算起）用90天时间线性转换为有效算力。举例说明：假设用户于2020年8月1日购买1T云算力，Filecoin主网上线时间为2020年9月1日，那么在2020年9月1日前用户持有的有效算力为0，从2020年9月1日至2020年11月30日，用户持有的有效算力从0线性增加到1T，从2020年12月1日至2021年8月31日，用户持有的有效算力为1T。DK-IPFS矿池的有效算力为filscan.io上显示的本矿池的RawByte数量。</label>
					<label>5.分配公式：用户每日FIL分配数=用户持有的有效算力T数 × DK-IPFS矿池每T有效算力每天产币量 ×（1-技术服务费20%）。</label></view>

				<view class="top-ipfs-desc-title">关于撤销申购</view>
				<view class="top-ipfs-desc-content">从Filecoin主网上线后Filecoin云算力租赁服务产出FIL的第2日开始（以达客算力产币日开始计算），依据您参与方式（官网、DK-Wallet）账户的Filecoin权益凭证数量每日计算和分配挖矿产出的FIL。DK-IPFS将在次日14:00-24:00发放前一日FIL至您参与账户内。</view>

				<view class="top-ipfs-desc-title">如何发放挖矿产出的FIL</view>
				<view class="top-ipfs-desc-content">由于该项租赁服务的特殊性，平台将在用户申购之后进行增加矿机、扩建矿池和调试测试等大量准备和建设工作，故不支持退货退款，请谨慎下单。鉴于Filecoin主网配置的不确定性和其他风险因素，DK-IPFS亦保留无条件撤销本次活动中所有申购订单的权利。</view>

				<view class="top-ipfs-desc-title">DK-IPFS云算力平台矿机租赁及委托管理服务协议</view>
				<view class="top-ipfs-desc-content">参与申购，即代表您已经充分阅读并认可本协议《DK-IPFS矿机租赁及委托管理服务协议》（详情见下方【附件1】）。</view>
			</view>

			<view class="top-ipfs-risk">
				<view class="top-ipfs-box-title">风险提示:</view>
				<view class="top-ipfs-desc-content">
					<label>1.基于Filecoin云算力的产出会受到FIL价格和挖矿难度波动的影响，DK-IPFS云算力平台租赁服务无法向用户作基于金或币本位的保本及退款承诺。请仔细评估个人的风险承受能力，并在可接受范围内参与。DK-IPFS云算力租赁服务保留对本产品和协议的所有解释权。</label>
					<label>2.用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致DK-IPFS挖矿行为被叫停、或者禁止的，本合同自动终止，双方不得相互追究责任，由此造成的损失须自行承担，用户已支付的费用概不退还。</label>
					<label>3.本产品不涉及数字资产交易，若用户自行参与数字资产交易，应当自行承担相关的责任和风险。</label></view>
			</view>
			<view class="top-ipfs-relief">
				<view class="top-ipfs-box-title">免责声明:</view>
				<view class="top-ipfs-desc-content">
					<label>1.由于市场币价波动和挖矿难度影响，DK-IPFS挖矿预期收益可能与实际收益有所偏差；不保证用户DK-IPFS挖矿的绝对收益。</label>
					<label>2.Filecoin主网上线的时间以Filecoin官方为准，挖矿收益按照主网上线后算力的实际挖矿数据为准，平台不做任何时间和收益担保。</label>
					<label>3.对于各类市场活动活动，DK-IPFS保留最终解释权。</label></view>
			</view>
			<view class="top-ipfs-question">
				<view class="top-ipfs-box-title">常见问题:</view>
				<view class="top-ipfs-desc-title">IPFS是什么？</view>
				<view class="top-ipfs-desc-content">IPFS即星际文件系统，是一种基于内容寻址、版本化、点对点的超媒体传输协议，集合了P2P网络技术、BitTorrent传输技术、Git版本控制、SFS自证明文件系统等技术，旨在对标当前的HTTP协议，构建全新的下一代网络协议。</view>
				<view class="top-ipfs-desc-title">Filecoin是什么？</view>
				<view class="top-ipfs-desc-content">Filecoin是IPFS的激励层，通过区块链的Token激励模型构建了一个去中心化存储网络。Filecoin代币名称为FIL。在Filecoin的激励模型下，构建了存储市场和检索市场。矿工通过提供存储服务和检索服务以获取用户支付的FIL代币。</view>
				<view class="top-ipfs-desc-title">Filecoin主网什么时候上线？</view>
				<view class="top-ipfs-desc-content">官方最新公布Filecoin主网上线时间是2020年10月15日。详情可关注官方动态，Filecoin官网链接：https://Filecoin.io/</view>
				<view class="top-ipfs-desc-title">Filecoin云算力如何计算和分配FIL产出？</view>
				<view class="top-ipfs-desc-content">用户购买Filecoin有效云算力的份额占矿池总算力(即filscan.io上显示的本矿池的RawByte数量)的比例来分配每日挖矿的FIL产出，扣除管理费即为用户实际获得的FIL数量。</view>
			</view>

			<view class="top-ipfs-annex">
				<view class="top-ipfs-box-title">附件1：
					<br>DK-IPFS云算力平台租赁及委托管理服务协议</view>
				<view class="top-ipfs-desc-content">DK-IPFS（以下简称“我们”）致力使用最优技术提供IPFS云挖矿服务。通过将我们自有矿机的算力租赁给用户，并同步提供矿机委托管理和挖矿维护服务，为用户提供不同规模的加密数字货币挖矿能力的一站式解决方案。以下条款内容为我们的服务协议具体内容（下称“本协议”），通过您在我们网站平台的操作，我们将共同受到本协议条款的约束，通过本协议建立法律上的权利义务关系。请您先仔细阅读本协议内容，充分理解本协议的各项条款。认可本协议后，与我们共同遵守本协议。您使用平台服务、通过网络页面确认或以其他方式接受本协议，即视为您已充分理解本协议所有条款，并同意与我们订立本协议。如您在同意订立本协议之前，对本协议内容存在疑虑或异议，请您联系我们，以便我们为您进行解释和说明，使您能够充分理解，从而帮助您自主决定是否接受本协议及是否使用我们的服务。根据所在国的有关法律、法规的规定，经双方平等、自愿协商，特就用户向DK-IPFS平台租赁矿机并委托DK-IPFS平台提供托管服务事宜，达成以下一致条款，以供双方共同遵照执行：</view>
				<view class="top-ipfs-desc-title">一、矿机的租赁</view>
				<view class="top-ipfs-desc-content">租赁矿机：DK-IPFS平台向用户提供相关矿机，用户可以租赁的方式来取得矿机在本协议期限内的使用权；用户同步委托DK-IPFS平台对矿机进行委托管理，以便于实现用户算力的最大化，最大限度保障用户的权益。</view>
				<view class="top-ipfs-desc-title">二、矿机的委托管理服务内容</view>
				<view class="top-ipfs-desc-content">
					<label>2.1 场地配套服务：DK-IPFS平台为租赁矿机的用户提供主机场地、电力配套、宽带网络配套、安全监控及主机管理和故障的排查，并协助厂家或相关方进行维修等托管服务。</label>
					<label>2.2 日常监控服务：DK-IPFS平台进行日常监控，以保证用户租赁并委托管理的矿机平稳运行。</label>
					<label>2.3 网络与信息安全保障：DK-IPFS平台有按要求配合国家有关部门处理互联网络与信息安全工作的义务。</label>
					<label>2.4 最大算力保障：DK-IPFS平台尽可能保证租赁矿机每月挖矿时长，以保障用户在租赁期间内最大限度实现算力收益；若出现停电状况，DK-IPFS平台保证对用户按照一比一的方式，弥补因停电造成的矿机停运而导致的时长损失，即每停电一个小时，DK-IPFS平台多补偿用户一个小时的矿机租赁时间。</label>
				</view>

				<view class="top-ipfs-desc-title">三、租赁和委托管理的期限</view>
				<view class="top-ipfs-desc-content">用户租赁并委托管理的矿机，其运行期限为:12 个自然月（自用户支付租赁费用或挖矿资产主网正式上线时间计算，具体时间以租赁页面为准）。矿机运行和维修费用（下称“运维费用”）由DK-IPFS平台负责，用户不承担该运维费用。</view>
				<view class="top-ipfs-desc-title">四、费用负担</view>
				<view class="top-ipfs-desc-content">用户向DK-IPFS平台支付的费用包含：年度矿机租赁费、委托管理费和基础电费等。</view>
				<view class="top-ipfs-desc-title">五、用户和DK-IPFS平台的权利义务关系</view>
				<view class="top-ipfs-desc-content">5.1 用户权利与义务
					<br>5.1.1 用户有权在DK-IPFS租赁矿机、储存并提取相应数字资产；
					<br>5.1.2 用户有权在DK-IPFS查看其账号下的信息，有权应用DK-IPFS提供的功能进行操作；
					<br>5.1.3 DK-IPFS承诺为用户提供的其他服务。
					<br>5.1.4 用户不得通过任何手段恶意注册DK-IPFS账号，包括但不限于以牟利、炒作、套现、获奖等为目的多个账号注册。用户亦不得盗用其他用户账号。 如用户违反上述规定，则DK-IPFS有权直接采取一切必要的措施，包括但不限于暂停或查封用户账号，取消因违规所获利益，直至通过诉讼形式追究用户法律责任等。
					<br>5.1.5 禁止用户将DK-IPFS以任何形式作为从事各种非法活动的场所、平台或媒介。未经DK-IPFS的授权或许可，用户不得借用本站的名义从事任何商业活动，也不得以任何形式将DK-IPFS作为从事商业活动的场所、平台或媒介。
					<br>5.2 DK-IPFS权利与义务
					<br>5.2.1 在用户使用本网站提供的矿机租赁服务时，DK-IPFS有权按相应规则向用户收取服务费用。DK-IPFS拥有制订及调整服务费之权利，除非另有说明或约定，用户同意DK-IPFS有权自用户账户的资产中直接扣除上述服务费用；
					<br>5.2.2 DK-IPFS通过技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或中止、终止为其提供租赁服务；
					<br>5.2.3 DK-IPFS有权在发现DK-IPFS上显示的任何信息存在明显错误时，对信息予以更正；
					<br>5.2.4 DK-IPFS保留随时修改、中止或终止矿机租赁服务的权利，DK-IPFS行使修改或中止服务的权利时，需事先在DK-IPFS官网发布公告告知用户；
					<br>5.2.5 DK-IPFS应当采取必要的技术手段和管理措施保障矿机的正常运行；
					<br>5.2.6  DK-IPFS通过加强技术投入、提升安全防范等措施，保障用户的资金及算力托管安全，有义务在用户资产出现可以预见的安全风险时尽早通知用户；
				</view>

				<view class="top-ipfs-desc-title">六、关于用户算力最大化的法律声明</view>
				<view class="top-ipfs-desc-content">DK-IPFS平台致力于为用户提供一站式数字货币算力解决方案，但数字货币算力带来的收益，受到对应数字货币市场总算力状况，某一时段的数字货币挖矿分配方案、对应币值波动等多个方面的影响，而这些都是不可预测的。每个用户都应就租赁矿机带来的收益作出独立判断，并应在选择是否租赁矿机时考虑风险和自身情况。DK-IPFS平台并不对用户挖矿收益承担责任。</view>
				<view class="top-ipfs-desc-title">七、协议变更、解除、终止和权利义务的转让</view>
				<view class="top-ipfs-desc-content">7.1 协议变更
					<br>DK-IPFS平台保留根据市场的需要，不定期修改交易方式、托管时长等协议内容的权利，如果根据诚实信用原则是被认为合理的或必要的。
					<br>7.2 协议解除与终止
					<br>您在使用平台服务的过程中，如果有下列情形发生，我们有权单方面解除本协议：
					<br>7.2.1 您在DK-IPFS的账户因任何原因注销的；
					<br>7.2.2 冒用他人名义、盗用他人账户使用平台服务的；
					<br>7.2.3 为非法目的使用平台服务的；
					<br>7.2.4 从事任何可能侵害平台系统、资料之行为；
					<br>7.2.5 违反任何法律法规、本协议约定的；
					<br>7.2.6 监管机构认为平台提供的服务不再符合相关监管规定的；
					<br>7.2.7 除上述原因外，我们可以根据风险及自身业务运营情况需要终止向您提供某些服务，届时公司将会视具体情况公告。鉴于这属于正常商业决策行为，如因此导致您无法使用平台服务或服务受到限制的，我们无须对此承担任何责任。
					<br>7.3 权利义务的转让
					<br>我们可以基于平台服务的需要，变更或增加履约主体，如您继续使用平台服务的，视为同意变更后的主体或新增的主体作为与您履约的相对方。</view>
				<view class="top-ipfs-desc-title">八、争议的解决</view>
				<view class="top-ipfs-desc-content">本协议的订立、效力、解释、履行及争议的解决均适用所在国法律。在协议履行期间，凡由本协议引起的或与本协议有关的一切争议、纠纷，当事人应首先协商解决。协商不成，各方一致同意提交被告方所在地法院通过诉讼方式解决。</view>
				<view class="top-ipfs-desc-title">九、通知</view>
				<view class="top-ipfs-desc-content">本协议履行过程中，我们向您发出的书面通知方式包括邮寄纸质通知、DK-IPFS平台网站公告、电子邮件、手机短信和传真等一种或几种方式</view>
				<view class="top-ipfs-desc-title">十、其他</view>
				<view class="top-ipfs-desc-content">10.1本协议的附件及各项补充、修订或变更，为本协议不可分割的组成部分，与本协议正文具有同等法律效力。
					<br>10.2本协议各方应按法律法规及相关规定各自承担与本协议相关的税费。
					<br>10.3 本协议未尽事宜，由双方协商处理，或者按国家有关法律、法规的规定执行。</view>
				<view class="top-ipfs-risk-alert">
					<label>风险提示：</label>数字资产是创新的投资产品，价格波动较大，请您理性判断自己的投资能力，审慎做出投资决策。</view>
					
				<view class="top-ipfs-collapse" @click="showMore=false">收起</view></view>
		</view>
	</view>
	
	<upTop :display="upTop"><!-- upTop 混入变量 --></upTop>
	
	<bottom-select ref="bottomSel" :value="value" :cancelLight="true" :items="selObj" @callBack="callback"></bottom-select>
	
	<Dialog :title="$lang.dialog.title2" ref="dialogOne" :isCancelBtn="false" :content="notice" :sureText="$lang.dialog.groupBtnOk3" @close="close" @confirm="confirm"></Dialog>
</view>
</template>
<script>
	import bottomSelect from '../../component/bottomSelect.vue'
	import Dialog from '../../component/dialog.vue'
	export default {
		components:{bottomSelect,Dialog},
		data() {
			return {
				ipfsInfo:{},
				selObj:[
					{value:1,text:'3金豆种子 / T'},
					// {value:2,text:'260USDT / T'},
					// {value:3,text:'1688RMB / T'},
				],
				value:'1',
				subscribeNum:'',
				checkBox:false,
				showMore:false,
				notice:'展开查看更多',
			}
		},
		mounted(){
			this.getIpfsInfo()
			// this.$refs.dialogOne.open()
		},
		methods: {
			inputNumFun(){
				if (this.subscribeNum.indexOf('.')>=0) {
					setTimeout(()=>{
						this.subscribeNum=this.subscribeNum.substring(0,this.subscribeNum.indexOf('.'))
					},100)
				}
			},
			submit(){
				
				if (this.value=='') {
					uni.showToast({
						title:this.$lang.subscribe.formHolder1,
						duration:1500,
						icon:"none"
					})
					return
				}
				if (this.subscribeNum=='') {
					uni.showToast({
						title:this.$lang.subscribe.err1,
						duration:1500,
						icon:"none"
					})
					return
				}
				if (isNaN(this.subscribeNum)) {
					uni.showToast({
						title:this.$lang.subscribe.err2,
						duration:1500,
						icon:"none"
					})
					return
				}
	
				if (!this.checkBox) {
					uni.showToast({
						title:this.$lang.subscribe.err3,
						duration:1500,
						icon:"none"
					})
					return
				}
				/* if (this.value!=1) {
					uni.showToast({
						title:this.$lang.subscribe.err4,
						duration:1500,
						icon:"none"
					})
					return
				} */
				// return
				uni.showLoading({title: this.$lang.common.waiting,mask:true});
				this.$request({
					url: '/v2/s/ipfsRecord/subscribe',
					data:{
						subscribeNum:this.subscribeNum,
						type: this.value,//（认购类型 1:金豆种子 2:USDT 3:RMB）
					},
					method:'POST',
				}).then(res=>{
					this.checkBox=false
					this.subscribeNum=''
					uni.hideLoading();
					uni.showToast({
						title:this.$lang.subscribe.success,
						duration:1500,
						icon:"success"
					})
					this.getIpfsInfo()
				}).catch(error=>{
					setTimeout(()=>{
						uni.hideLoading();
						uni.showToast({
							title:error.errmsg,
							duration:1500,
							icon:"none"
						})
					},500)
				});
			},
			showNotice(notice){
				this.notice=notice
				this.$refs.dialogOne.open()
			},
			confirm() {
				// console.log('yyy');
			},
			close() {
				// console.log('ssssss');
			},
			handleFun(e){
				var val=e.detail.value[0]||''
				if(val!=''){
					this.checkBox=true
					this.showMore=true
					var timer = setTimeout(() =>{
						uni.pageScrollTo({
							duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
							scrollTop: 1750,//滚动到目标位置
							success:function(){
								// console.log('成功了')
							}
						})
						clearTimeout(timer)
					},100)
				}else{
					this.checkBox=false
				}
			},
			getIpfsInfo(){
				if(!this.isNetWork()) return
				this.$request({
					url: '/v2/s/ipfsRecord/getIpfsInfo',
					data:{},
					method:'post'
				}).then(res=>{
					this.ipfsInfo=res.data;
				}).catch(error=>{
					console.log(error);
				});
			},
			callback(type){
				this.value=type
				this.$forceUpdate()
			},
		}
	}
</script>

<style scoped>
	.subTop{background: #1762E6;color: #fff;padding:15px;height: 105px;}
    .topTitle{display: flex;justify-content: space-between;margin-bottom: 10px;}
    .topTitle label{font-weight: 600;font-size: 18px;color: #fff;}
    .topTitle view{text-decoration: none;color: #fff;display: flex;align-items: center;font-size: 14px;}
    .topTitle view image{width: 12rpx;height: 24rpx;margin-left: 5px;}
    .topsItem{flex: 1;}
    .topsItem label{font-size: 24rpx;color: #9BBFFF;}
    .topsItem view{font-weight: 600;margin-top: 5px;color: #fff}
	
	.feedItem{margin-bottom: 20px;}
	.itemTt{font-weight: 500;}
	.feedItem input,.selectBox{height: 50px;width: 100%;border-bottom: 1px solid #E5E5E5;font-size: 34rpx;}
	.selectBox text,.selectBox view.noChose{color: #999;}
	
	.xieyi{padding:0 0 20px 0;color: #1762E6;}
	.bankInfo{padding:15px;background-color: #F7F7FB;border-radius: 5px;}
	.bankInfo .name{color: #8C9FAD;margin-bottom: 5px;}
</style>
<style scoped>

    /*.top-ipfs-banner {width:100%;height:48.000000vw;background:url(../assets/banner.png) no-repeat;background-size:cover}*/
    .top-ipfs-box-title {font-weight:500;font-size:4.266667vw;color:#333;line-height:5.866667vw}
    .top-ipfs-desc-title {font-size:3.733333vw;font-weight:500;color:#333;line-height:5.333333vw}
    .top-ipfs-desc-content {margin-bottom:3.733333vw;font-size:3.733333vw;color:#666;line-height:5.333333vw}
    .top-ipfs-desc-content label {display:block;margin-bottom:2.133333vw}
    .top-ipfs-content {background:#f5f7fa}
    .top-ipfs-content>view {padding:4.266667vw;background:#fff}
    .top-ipfs-content .top-ipfs-more-content {padding:0;background:#f5f7fa}
    .top-ipfs-content .top-ipfs-more-content>view {padding:4.266667vw;background:#fff}
    .top-ipfs-project {margin-bottom:2.666667vw}
    .top-ipfs-project>view {margin-bottom:1.600000vw}
    .top-ipfs-project .top-ipfs-project-title {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;line-height:5.866667vw}
    .top-ipfs-project .top-ipfs-project-title .top-ipfs-project-income {margin-left:2.133333vw;padding-left:1.600000vw;width:41.533333vw;height:5.866667vw;border-radius:0.800000vw;font-size:3.200000vw;color:#2794ff;border:1px solid #2794ff;text-align:center}
    .top-ipfs-project .top-ipfs-project-title .top-ipfs-project-income images {margin-top:-1.333333vw;width:7.466667vw;height:7.466667vw;vertical-align:middle}
    .top-ipfs-project .top-ipfs-project-price {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-moz-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}
    .top-ipfs-project .top-ipfs-project-price .top-ipfs-project-price-new {font-size:3.733333vw;font-weight:500;line-height:5.333333vw;color:#f45a1a}
    .top-ipfs-project .top-ipfs-project-price .top-ipfs-project-price-old {margin-left:3.466667vw;font-size:3.200000vw;font-weight:600;color:#888;line-height:4.533333vw;text-decoration:line-through}
    .top-ipfs-project .top-ipfs-project-desc {font-size:3.200000vw;font-weight:500;color:#f45a1a;line-height:4.533333vw}
    .top-ipfs-project .top-ipfs-project-time {font-size:3.200000vw;font-weight:500;color:#888;line-height:4.533333vw}
    .top-ipfs-form {margin-bottom:2.666667vw}
    .top-ipfs-form .top-ipfs-box-title {margin-bottom:2.666667vw}
    .top-ipfs-form .top-ipfs-tog-addr {margin-top:-4.533333vw;margin-bottom:5.600000vw;width:76.800000vw;height:6.933333vw;font-size:3.200000vw;background:rgba(39,148,255,.1);border-radius:0.533333vw;line-height:6.933333vw;color:#2794ff;text-align:center}
    .top-ipfs-form .top-ipfs-calcusdt {margin-bottom:4.266667vw;color:#888}
    .top-ipfs-form .top-ipfs-calcusdt label {padding-bottom:1.600000vw;font-size:3.733333vw}
    .top-ipfs-form .top-ipfs-calcusdt text {font-style:normal;font-size:3.200000vw}
    .top-ipfs-form .top-ipfs-form-submit {margin-top:6.133333vw;width:100%;height:12.266667vw;background:#2794ff;border-radius:1.600000vw;text-align:center;line-height:12.266667vw;color:#fff}
    .top-ipfs-form .top-ipfs-submit-disable {background:rgba(39,148,255,.6)}
    .top-ipfs-content .top-ipfs-wechat-tip {margin:3.200000vw 0;width:91.733333vw;-webkit-transform:translateX(3.733333vw);transform:translateX(3.733333vw);background:#e0e8ee;border-radius:1.066667vw;font-size:3.733333vw;font-weight:400;color:#333;line-height:5.333333vw;text-align:center}
    .top-ipfs-content .top-ipfs-wechat-tip label text {font-style:normal;font-weight:500}
    .top-ipfs-content .top-ipfs-wechat-tip images {margin-left:5.866667vw;width:6.666667vw;height:6.666667vw;vertical-align:middle}
    .top-ipfs-step {margin-bottom:2.666667vw}
    .top-ipfs-step .top-ipfs-box-title {margin-bottom:4.266667vw}
    .top-ipfs-step .top-ipfs-step-title {margin-bottom:2.666667vw;font-size:3.733333vw}
    .top-ipfs-step .top-ipfs-step-title view {display:inline-block;margin-right:1.600000vw;width:5.333333vw;height:5.333333vw;background:#2794ff;font-size:3.733333vw;color:#fff;border-radius:100%;text-align:center;line-height:5.333333vw}
    .top-ipfs-step .top-ipfs-step-title label {font-weight:500;color:#2794ff;line-height:5.333333vw}
    .top-ipfs-step .top-ipfs-step-content {margin-bottom:6.400000vw;font-size:3.733333vw;font-weight:500;color:#333}
    .top-ipfs-step .top-ipfs-step-content .top-ipfs-step-off {padding:3.200000vw 5.866667vw 3.466667vw 4.000000vw;width:100%;height:25.933333vw;background:#f5f7fa;border-radius:1.066667vw}
    .top-ipfs-step .top-ipfs-step-content .top-ipfs-step-off .top-ipfs-step-off-copy {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;color:#888}
    .top-ipfs-step .top-ipfs-step-content .top-ipfs-step-off .top-ipfs-step-off-copy images {width:6.666667vw;height:6.666667vw}
    .top-ipfs-step .top-ipfs-step-content .top-ipfs-step-off label {word-break:break-all}
    .top-ipfs-step .top-ipfs-step-content .top-ipfs-offcial-tip {color:#ff1b1b;margin-top: 10px;display: block;}
    .top-ipfs-staking table {font-size:3.200000vw;color:#6d778a;border-top:1px solid #e1e7f1}
    .top-ipfs-staking table thead {height:12.800000vw;background:#efeff2}
    .top-ipfs-staking table thead th {padding:2.666667vw 0 1.600000vw;font-weight:normal;border-bottom:1px solid #e1e7f1;border-right:1px solid #e1e7f1}
    .top-ipfs-staking table thead th:nth-of-type(1) {border-left:1px solid #e1e7f1}
    .top-ipfs-staking table tbody {background:#fcfcfc}
    .top-ipfs-staking table tbody tr:nth-of-type(1) {height:11.466667vw}
    .top-ipfs-staking table tbody tr:nth-of-type(2) {height:14.133333vw}
    .top-ipfs-staking table tbody tr:nth-of-type(3) {height:14.133333vw}
    .top-ipfs-staking table tbody tr:nth-of-type(4) {height:22.133333vw}
    .top-ipfs-staking table tbody tr:nth-of-type(5) {height:22.133333vw}
    .top-ipfs-staking table tbody tr:nth-of-type(6) {height:22.133333vw}
    .top-ipfs-staking table tbody tr td {padding:0.533333vw 1.066667vw;text-align:center;border-bottom:1px solid #e1e7f1;border-right:1px solid #e1e7f1}
    .top-ipfs-staking table tbody tr td:nth-of-type(1) {border-left:1px solid #e1e7f1}
    .top-ipfs-staking images {margin-top:-0.800000vw;margin-left:-2.133333vw;width:6.933333vw;height:6.933333vw;vertical-align:middle}
    .top-ipfs-more {margin-top:-2.666667vw;padding:6.400000vw 0 13.066667vw;height:24.800000vw;color:#888;text-align:center}
    .top-ipfs-more::after {content:"";display:inline-block;margin-top:-2.133333vw;margin-left:1.333333vw;width:1.866667vw;height:1.866667vw;border-bottom:1px solid #888;border-left:1px solid #888;-webkit-transform:rotateZ(-45deg);transform:rotateZ(-45deg);vertical-align:middle}
    .top-ipfs-staking,.top-ipfs-service,.top-ipfs-risk,.top-ipfs-relief,.top-ipfs-question {margin-bottom:2.666667vw}
    .top-ipfs-staking .top-ipfs-box-title,.top-ipfs-service .top-ipfs-box-title,.top-ipfs-risk .top-ipfs-box-title,.top-ipfs-relief .top-ipfs-box-title,.top-ipfs-question .top-ipfs-box-title {margin-bottom:3.733333vw}
    .top-ipfs-staking .top-ipfs-desc-title,.top-ipfs-service .top-ipfs-desc-title,.top-ipfs-risk .top-ipfs-desc-title,.top-ipfs-relief .top-ipfs-desc-title,.top-ipfs-question .top-ipfs-desc-title {margin-bottom:0.800000vw}
    .top-ipfs-content .top-ipfs-annex {padding-bottom:11.466667vw}
    .top-ipfs-risk-alert {color:#6d778a}
    .top-ipfs-risk-alert label {display:block;margin-bottom:2.133333vw}
    .top-ipfs-collapse {margin-top:8.000000vw;height:8.000000vw;text-align:center;line-height:8.000000vw}
    .top-ipfs-to-top {position:fixed;bottom:11.733333vw;right:5.866667vw;width:11.200000vw;height:11.200000vw}
    .top-ipfs-address-box input,.top-ipfs-input-box input {padding:0;width:80.000000vw;height:5.333333vw;font-size:3.733333vw;outline:none;border:none;background:none;color:#333}
    .top-ipfs-address-box input::-webkit-input-placeholder,.top-ipfs-input-box input::-webkit-input-placeholder {color:#c6c6c6}
    .top-ipfs-address-box input::-moz-placeholder,.top-ipfs-input-box input::-moz-placeholder {color:#c6c6c6}
    .top-ipfs-address-box input:-ms-input-placeholder,.top-ipfs-input-box input:-ms-input-placeholder {color:#c6c6c6}
    .top-ipfs-address-box input::-ms-input-placeholder,.top-ipfs-input-box input::-ms-input-placeholder {color:#c6c6c6}
    .top-ipfs-address-box input::placeholder,.top-ipfs-input-box input::placeholder {color:#c6c6c6}
    .top-ipfs-address-box {margin-bottom:6.666667vw}
    .top-ipfs-address-box input {width:100%}
    .top-ipfs-address-box .top-ipfs-address-title {margin-bottom:2.666667vw;font-size:3.733333vw;font-weight:500;color:#666;line-height:5.333333vw}
    .top-ipfs-address-box label {color:#666;font-size:3.733333vw;word-break:break-all}
    .top-ipfs-address-box images {display:block;width:6.666667vw;height:6.666667vw}
    .top-ipfs-input-box .top-ipfs-desc-title {margin-bottom:6.400000vw}
    .top-ipfs-input-box .top-ipfs-input-child {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:4.266667vw}
    .top-ipfs-input-box .top-ipfs-input-child label {vertical-align:middle}
    .top-ipfs-input-box .top-ipfs-input-line {margin-bottom:1.866667vw;width:100%;height:1px;background:#efefef}
    .top-ipfs-input-box .top-ipfs-input-err {margin-bottom:2.133333vw;font-size:3.200000vw;color:#ff1b1b;line-height:4.533333vw}
    .dialog-wrapper {position:fixed;top:0;left:0;width:100vw;height:100vh;overflow:hidden;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;background-color:rgba(0,0,0,.5)}
    .dialog {width:72.000000vw;border-radius:2.666667vw;background-color:#f8f8f8}
    .dialog-title {padding:5.333333vw 0 0 0;text-align:center;font-size:4.533333vw;font-weight:500;line-height:5.866667vw;color:#000}
    .dialog-content {padding:5.333333vw 5.333333vw;text-align:center;font-size:3.733333vw;font-weight:400;line-height:5.333333vw;color:#333}
    .dialog-footer {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;border-top:1px solid rgba(153,153,153,.5)}
    .dialog-footer__content {display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;width:100%}
    .dialog-footer__cancel,.dialog-footer__confirm {-webkit-box-flex:1;-moz-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;width:50%;height:11.733333vw;text-align:center;font-size:4.533333vw;font-weight:400;line-height:11.733333vw;color:#888}
    .dialog-footer__cancel:active,.dialog-footer__confirm:active {background-color:rgba(0,0,0,.1)}
    .dialog-footer__confirm {font-weight:600;color:#007aff}
    .dialog-footer__split {-webkit-box-flex:0;-moz-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;width:1px;height:100%;background-color:rgba(153,153,153,.5)}

    .dialog-transition-appear {opacity:0}
    .dialog-transition-appear .dialog {-webkit-transform:scale(0.1,0.1);transform:scale(0.1,0.1)}
    .dialog-transition-appear-active {opacity:1;-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}
    .dialog-transition-appear-active .dialog {-webkit-transform:scale(1);transform:scale(1);-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}
    .dialog-transition-enter {opacity:0}
    .dialog-transition-enter .dialog {-webkit-transform:scale(0.1,0.1);transform:scale(0.1,0.1)}
    .dialog-transition-enter-active {opacity:1;-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}
    .dialog-transition-enter-active .dialog {-webkit-transform:scale(1);transform:scale(1);-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}
    .dialog-transition-exit {opacity:1}
    .dialog-transition-exit .dialog {-webkit-transform:scale(1);transform:scale(1)}
    .dialog-transition-exit-active {opacity:0;-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}
    .dialog-transition-exit-active .dialog {-webkit-transform:scale(0.1,0.1);transform:scale(0.1,0.1);-webkit-transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03);transition:all 300ms cubic-bezier(0.66,0.04,0.36,1.03)}

</style>
