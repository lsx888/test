/*package com.yinhai.trader.archives.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;

import com.yinhai.hf.cache.BaseContents;
import com.yinhai.hf.service.MyBaseService;
import com.yinhai.hf.utils.FtpUtils;
import com.yinhai.hf.utils.XmlUtils;
import com.yinhai.sysframework.exception.AppException;
import com.yinhai.sysframework.util.ValidateUtil;

*//**
 * 电子档案客户端Service入口
 * 
 * @author Spring
 * @createTime 2015-3-30下午7:32:58
 * 
 * @version V1.0
 *//*
@SuppressWarnings({ "rawtypes", "unchecked" })
public class DaService extends MyBaseService implements IDaService {

	public Map getBusAttachments(Map inmap) throws Exception {
		Map map = new HashMap();
		map.putAll(inmap);
		map.put("reqcode", "DA001");
		String busType = inmap.get("bustype").toString();
		int index = busType.indexOf("-");
		if(index == -1){
			busType = busType + "-50";//档案默认需要拼接
			inmap.put("ywlx", busType);
		}
		if(ValidateUtil.isEmpty(inmap.get("zxbh"))){
			throw new AppException("中心编号不能为空");
		}
		Map map2 = this.doData(map);
		if("0".equals(map2.get("rescode"))){
			String resmsg = ValidateUtil.isEmpty(map2.get("resmsg"))?"":(String)map2.get("resmsg");
			throw new AppException(resmsg);
		}
		return map2;
	}
	
	public Map doCleanArchDirtyData(Map inmap) throws Exception {
		Map map = new HashMap();
		map.putAll(inmap);
		map.put("reqcode", "DA003");
		Map map2 = this.doData(map);
		return map2;
	}
	
	public Map doUploadCollArch(Map inmap) throws Exception {
		Map map = new HashMap();
		map.putAll(inmap);
		map.put("reqcode", "DA002");
		Map map2 = this.doData(map);
		return map2;
	}
	
	public Map doData(Map params) throws Exception {
		String code = (String) params.get("reqcode");
		if (ValidateUtil.isEmpty(code)) {
			throw new AppException("外围接口代码参数不能为空!");
		}
		HashMap reqHM = new HashMap();
		if (!ValidateUtil.isEmpty(params)) {
			reqHM.putAll(params);
		}
		reqHM.put("reqcode", code);
		String paramXml = XmlUtils.mapToXml(reqHM);
		String resXml = HOLDER.getService().doService(paramXml);
		Map resHM = XmlUtils.xmlTOMap(resXml);
		return resHM;
	}

	private static class HOLDER {
		public static ArchivesWsService service;
		static {
			JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
			factory.setServiceClass(ArchivesWsService.class);
			factory.setAddress(BaseContents.PARAM_ARCHIVES_WSURL);
			service = (ArchivesWsService) factory.create();
		}

		public static ArchivesWsService getService() {
			if (service == null) {
				JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
				factory.setServiceClass(ArchivesWsService.class);
				factory.setAddress(BaseContents.PARAM_ARCHIVES_WSURL);
				service = (ArchivesWsService) factory.create();
			}
			return service;
		}
	}
	
	public void doDeleteArchives(Map map) {
		if (ValidateUtil.isEmpty(map)) {
			throw new AppException("传入的参数不能为空!");
		} else if (ValidateUtil.isEmpty(map.get("ywdjh"))) {
			throw new AppException("传入的业务登记号不能为空!");
		}
		int numb = (Integer) super.getDao().queryForObject("daarchives.getSb10ByYwdjh", map);
		if (numb >= 1) {
			try {
				Map map3 = this.doCleanArchDirtyData(map);
				if ("1".equals(map3.get("rescode"))) {
					List<Map> list = super.getDao().queryForList("daarchives.getSt01ByEntityid", map);
					int size = list.size();
					int res = super.getDao().delete("daarchives.delSt01ByEntityid", map);// 删除多条附件记录信息
					if (res != size) {
						throw new AppException("清除附件信息失败！");
					}
					for (Map m : list) {
						if (!ValidateUtil.isEmpty(m.get("filepath"))) {
							FtpUtils.getInstance().delFile((String) m.get("filepath"));
						}
					}
				}
			} catch (Exception e) {
				throw new AppException("出错了！");
			}
		}
	}
}
*/