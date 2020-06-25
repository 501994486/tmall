package com.tmall.infrastructure.validate;

import com.tmall.ui.dto.GoodsDTO;
import com.tmall.ui.dto.GoodsImgDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

public class GoodsAdminValidator implements Validator {

	@Override
	public boolean supports(Class<?> entityClass) {
		return entityClass.equals(GoodsDTO.class);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		// 依存関係チェック
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		HttpSession session = attr.getRequest().getSession();
		GoodsDTO form = (GoodsDTO) obj;

		List<GoodsImgDTO> goodsImgList = form.getGoodsImgList();
		// 画像入力長さチェック
		for (GoodsImgDTO goodsImgDTO : goodsImgList) {
			String goodsImageFileName= null;
			if (goodsImgDTO.getImgFileName() != null) {
				goodsImageFileName = goodsImgDTO.getImgFileName() ;
			}
			String goodsImageDesc = null;
			if (goodsImgDTO.getImgDesc() != null) {
				goodsImageDesc = goodsImgDTO.getImgDesc();
			}

			String goodsImagePath = null;
			if (goodsImgDTO.getImgPath() != null) {
				goodsImagePath = goodsImgDTO.getImgPath();
			}

			if (StringUtils.isNotBlank(goodsImageFileName)) {
				// 入力チェック
				if (!isValidLength(goodsImageFileName, 0, 255, true)) {
					errors.rejectValue("title", null, "入力長さエラー");
				}
				else if (!isValidLength(goodsImageDesc, 0, 255, false)) {
					errors.rejectValue("imgFileName", null, "入力長さエラー");
				}
				else if (!isValidLength(goodsImagePath, 0, 300, false)) {
					errors.rejectValue("imgPath", null, "入力長さエラー");
				}
			}
		}
	}

	/**
	 * 文字列の合理的な長さをチェックする
	 *
	 * @param strIn
	 * @param minLen
	 * @param maxLen
	 * @param allowNull
	 * @return boolean
	 */
	public static boolean isValidLength(String strIn, int minLen, int maxLen, boolean allowNull) {
		if(allowNull && strIn == null){
			return true;
		}else if(!allowNull && strIn == null) {
			return false;
		}else{
			int strLen = strIn.length();
			if (strLen >= minLen && strLen <= maxLen) {
				return true;
			}else{
				return false;
			}
		}
	}
}
