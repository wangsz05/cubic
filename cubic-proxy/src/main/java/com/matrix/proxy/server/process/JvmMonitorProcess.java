package com.matrix.proxy.server.process;

import com.cubic.proxy.common.constant.ResponseCode;
import io.netty.channel.ChannelHandlerContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @ClassName TestMessgaeProcess
 * @Author QIANGLU
 * @Date 2020/3/19 4:12 下午
 * @Version 1.0
 */
@Slf4j
@Service
public class JvmMonitorProcess extends DefaultMessageProcess {

    public JvmMonitorProcess() {
    }

    @Override
    public Integer code() {
        return ResponseCode.JVM.getCode();
    }

    @Override
    public void process(ChannelHandlerContext ctx, String datagram) {


        log.info("data:{}", datagram);
    }

}
