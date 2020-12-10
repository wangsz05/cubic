package com.cubic.agent.jvm.thread;

import com.cubic.agent.boot.CommonService;
import com.cubic.agent.boot.DefaultNamedThreadFactory;
import com.cubic.agent.boot.DefaultService;
import com.cubic.agent.boot.ServiceManager;
import com.cubic.agent.conf.AgentConfig;
import com.cubic.agent.conf.RemoteDownstreamConfig;
import com.cubic.agent.dictionary.DictionaryUtil;
import com.cubic.agent.module.ThreadMetricCollection;
import com.cubic.agent.remote.*;
import com.cubic.proxy.common.thread.RunnableWithExceptionProtection;
import com.google.gson.Gson;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelFutureListener;
import io.netty.util.concurrent.DefaultThreadFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * @Description: jvm线程栈采集
 * @Author qinqixuan
 * @Date 2020/12/08
 * @Version V1.0
 **/
@DefaultService
public class JVMThreadService implements CommonService {

    private static final Logger logger = LoggerFactory.getLogger(JVMThreadService.class);

    private volatile ScheduledFuture<?> sendMetricFuture;
    private Sender sender;
    private volatile AgentNettyClient client;

    @Override
    public void prepare() {
        sender = new Sender();
        ServiceManager.INSTANCE.findService(AgentClientManager.class).addListener(sender);
    }

    @Override
    public void start() {

        sendMetricFuture = new ScheduledThreadPoolExecutor(1, new DefaultThreadFactory("JVMService-consume")).scheduleAtFixedRate(new RunnableWithExceptionProtection(sender, th -> {
            logger.error("JVMService consumes and upload failure.", th);
        }), 0, 1, TimeUnit.MINUTES);

    }

    @Override
    public void shutdown() {
        sendMetricFuture.cancel(true);
    }

    @Override
    public void complete() {

    }

    class Sender implements Runnable, AgentChannelListener {
        private volatile ChannelStatus status = ChannelStatus.DISCONNECT;

        @Override
        public void run() {

            if (status == ChannelStatus.CONNECTION) {
                try {
                    long currentTimeMillis = System.currentTimeMillis();
                    ThreadMetricCollection.Builder builder = new ThreadMetricCollection.Builder();
                    builder.setThreadDump(ThreadProvider.INSTANCE.getThreadDump());
                    builder.setAllThreadPools(ThreadPoolProvider.INSTANCE.getDubboThreadPool());
                    builder.setServiceName(AgentConfig.Agent.SERVICE_NAME);
                    builder.setTime(currentTimeMillis);
                    builder.setInstanceUUID(AgentConfig.Agent.INSTANCE_UUID);

                    Gson gson = new Gson();
                    client.getChannel().writeAndFlush(gson.toJson(builder.build())).addListener(new ChannelFutureListener() {
                        @Override
                        public void operationComplete(ChannelFuture future) throws Exception {
                            if (!future.isSuccess()) {
                                logger.error("JVMThreadService send {} fail");
                            } else {
                                logger.debug("JVMThreadService :{}  channel : {} ");
                            }
                        }
                    });
                } catch (Throwable t) {
                    logger.error("send JVM thread metrics to Collector fail.", t);
                }
            }
        }

        @Override
        public void statusChanged(ChannelStatus status) {
            if (ChannelStatus.CONNECTION.equals(status)) {
                client = ServiceManager.INSTANCE.findService(AgentClientManager.class).getClient();

            }
            this.status = status;
        }
    }
}