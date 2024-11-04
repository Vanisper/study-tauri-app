// 共享类型定义
export type OnCloseProps = {
    isClosing?: boolean; // 新增的关闭状态
    onClose?: () => void; // 关闭事件
};

export type SectionProps = {
  children: React.ReactNode; // 共享子元素的类型
};
