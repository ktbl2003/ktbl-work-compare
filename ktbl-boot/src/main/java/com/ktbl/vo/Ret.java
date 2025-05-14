/**
 * Copyright 2016-2030 this code originate from mgicode framework, using it under the below License
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.ktbl.vo;

//import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
//@Schema(description = "返回结果集")
public class Ret<T> {
    //@Schema(description = "是否成功", example = "", required = false)
    private boolean success;
   // @Schema(description = "返回编码", example = "", required = false)
    private String code = "200";//成功
   // @Schema(description = "提示消息", example = "", required = false)
    private String msg;
   // @Schema(description = "返回数据", example = "", required = false)
    private T data;
    //@Schema(description = "执行时间", example = "", required = false)
    private long runTime;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public long getRunTime() {
        return runTime;
    }

    public void setRunTime(long runTime) {
        this.runTime = runTime;
    }

    public static <T> Ret<T> success(T data) {
        Ret ret = new Ret();
        ret.setCode(200 + "");
        ret.setSuccess(true);
        if (data != null) {
            ret.setData(data);

        }
        return ret;
    }



    public static <T> Ret<T> success(T data, String msg) {
        Ret ret = new Ret();
        ret.setCode(200 + "");
        ret.setSuccess(true);
        ret.setMsg(msg);
        if (data != null) {
            ret.setData(data);
        }
        return ret;
    }

    public static Ret error(String msg) {
        Ret data = new Ret();
        data.setSuccess(false);
        data.setCode(505 + "");
        data.setMsg(msg);

        return data;
    }

    public static <T> Ret<T> error(String code, String msg, T data) {
        Ret ret = new Ret();
        ret.setSuccess(false);
        ret.setCode(code + "");
        ret.setMsg(msg);
        ret.setData(data);
        return ret;
    }

    public static Ret error(String code, String msg) {
        Ret ret = new Ret();
        ret.setSuccess(false);
        ret.setCode(code + "");
        ret.setMsg(msg);
        return ret;
    }

//    public static <T> Ret<T> failed() {
//        return result(ResultCode.SYSTEM_ERROR.getCode(), ResultCode.SYSTEM_ERROR.getMsg(), null);
//    }
//    public static <T> Ret<T> judge(boolean status) {
//        if (status) {
//            return success((T)null);
//        } else {
//            return failed();
//        }
//    }
//
//    public static <T> Ret<T> failed(String msg) {
//        return result(ResultCode.SYSTEM_ERROR.getCode(), msg, null);
//    }
//
////    public static <T> Ret<T> judge(boolean status) {
////        if (status) {
////            return success();
////        } else {
////            return failed();
////        }
////    }
//
//    public static <T> Ret<T> failed(IResultCode resultCode) {
//        return result(resultCode.getCode(), resultCode.getMsg(), null);
//    }
//
//    public static <T> Ret<T> failed(IResultCode resultCode, String msg) {
//        return result(resultCode.getCode(), StringUtils.isNotBlank(msg) ? msg : resultCode.getMsg(), null);
//    }

    private static <T> Ret<T> result(String code, String msg, T data) {
        Ret<T> result = new Ret<>();
        result.setCode(code);
        result.setData(data);
        result.setMsg(msg);
        return result;
    }

//    public static <T> Ret<T> success(T data) {
//        Result<T> result = new Ret<>();
//        result.setCode(ResultCode.SUCCESS.getCode());
//        result.setMsg(ResultCode.SUCCESS.getMsg());
//        result.setData(data);
//        return result;
//    }
//
//    public static boolean isSuccess(Ret<?> result) {
//        return result != null && ResultCode.SUCCESS.getCode().equals(result.getCode());
//    }
}
