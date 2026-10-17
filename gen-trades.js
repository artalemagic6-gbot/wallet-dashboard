// Generates trades.json (public fields only) from the trade log. Reads ONLY trades.md.
const fs=require('fs');
const KO={'Exact-amount approval for core buys':'주요 코인 매수를 위한 정확한 금액만 승인','Core half: long-term ETH':'주요 코인 몫: 장기 보유용 ETH','Core half: long-term BTC diversification':'주요 코인 몫: 장기 비트코인 분산 투자'};
const rows=[];
for(const line of fs.readFileSync('/workspace/wallet/trades.md','utf8').split('\n')){
  if(!/^\|\s*\d{4}-\d{2}-\d{2}/.test(line))continue;
  const c=line.split('|').slice(1,-1).map(s=>s.trim());
  const m=c[6]&&c[6].match(/basescan\.org\/tx\/(0x[0-9a-fA-F]{64})/);
  rows.push({time:c[0],pair:c[1],in:c[2],out:c[3],price:c[4],tx:m?m[1]:null,reason:KO[c[7]]||c[7]});
}
fs.writeFileSync(__dirname+'/trades.json',JSON.stringify(rows.reverse(),null,2)+'\n');
console.log('trades.json:',rows.length,'rows');
