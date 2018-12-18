import Enum from 'utils/Enum';

var Status = new Enum(
  { alias: 'NORMAL', text: '正常' },
  { alias: 'DISABLED', text: '禁用' },
  { alias: 'DELETED', text: '已删除' }
);

console.log(Status[1]);
console.log(Status.DELETED);