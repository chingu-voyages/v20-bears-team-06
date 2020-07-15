import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import  url  from 'url';

let options: Redis.RedisOptions;

if (process.env.REDISTOGO_URL){
  
  let rtg = url.parse(process.env.REDISTOGO_URL);

  
  options = {
    host: rtg.hostname||undefined,
    port: Number(rtg.port)||undefined,
    password: rtg.auth?.split(":")[1],
    retryStrategy:(times:number) => Math.max(times * 100, 3000)
  }



}else{

   options= {
    host: '127.0.0.1',
    port: 6379,
    retryStrategy:(times:number) => Math.max(times * 100, 3000)
  };

  

  
}


export const redis = new Redis(options);

const publisher = new Redis(options);
const subscriber = new Redis(options);

export const pubSub = new RedisPubSub({
  publisher,
  subscriber
});






