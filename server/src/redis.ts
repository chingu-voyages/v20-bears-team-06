import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';






const options: Redis.RedisOptions = process.env.NODE_ENV==='production'
?{
  host: 'dory.redistogo.com',
  port: 9976,
  
  retryStrategy: (times:number) => Math.max(times * 100, 3000)
}
:{
  host: '127.0.0.1',
  port: 6379,
  retryStrategy: (times:number) => Math.max(times * 100, 3000)
};

export const redis = process.env.NODE_ENV==='production'? 
new Redis(
  "redis://redistogo:6b3c47b6095058cb31ad2d9e17d4652a@dory.redistogo.com:9976/")
  : new Redis(options);



const publisher = process.env.NODE_ENV==='production' 

? new Redis(options)
:new Redis(Object.assign(options,{connectionName:'publisher'}));
publisher.monitor(( e, monitor )=>{
  monitor.on('monitor', ( time, args, source, database) =>{
    console.log(time + ": " + `args:${args}, source:${source}, database:${database}`);
  })
  if (e) console.log(e);
});

const subscriber =process.env.NODE_ENV==='production'
?new Redis(options)
:new Redis(Object.assign(options,{connectionName:'subscriber'}));
subscriber.monitor(( e, monitor )=>{
  monitor.on('monitor', ( time, args, source, database) =>{
    console.log(time + ": " + `args:${args}, source:${source}, database:${database}`);
  })
  if (e) console.log(e);
});

export const pubSub = new RedisPubSub({
  publisher: publisher, 
  subscriber: subscriber
});




