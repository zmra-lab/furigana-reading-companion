# 日语振假名助读原理与模型说明 (Furigana Linguistic Principles & Model Architecture)

> **归属实验室**: ZMRA Open-Source Lab (`zmra-opensource-lab`)  
> **所属项目**: `furigana-reading-companion`  
> **官方主页**: [https://zmra.com](https://zmra.com) | **商务咨询**: `contact@zmra.com`

---

## 📌 1. 核心设计原则：纯本地离线引擎，零外部重型依赖

本项目专注于**日语汉字振假名（振仮名）注音与送假名词干分离助读**，**不依赖任何外部庞大模型或网络 API**：

1. **隐私安全与离线原则**:
   - 采用纯本地 JavaScript 形态素规则与高频词干分析器，所有分析 100% 在用户浏览器沙盒内执行，零数据外流。
2. **毫秒级极速响应**:
   - 避免引入完整 MeCab/IPADic 词典（常达数十 MB）导致的加载卡顿，页面打开即可即时交互打字。
3. **商业定制渠道**:
   - 针对 JLPT 满分级别专业分词引擎、私有化语音合成 (TTS) 系统及端侧嵌入式助读助手，请联系 `contact@zmra.com`。

---

## 🏭 2. AI 模型生产流水线：`model-builder` 与 `model-factory`

对于 ZMRA 旗下的复杂语义推理、企业知识库与智能助教模型，统一通过工作区标准车间处理：

1. **微调与量化车间**:
   - 路径：`zmra-model-builder`
   - 使用 QLoRA 针对语言学、教学问答语料进行微调，使用 llama.cpp 导出标准 GGUF 量化模型。
2. **Hugging Face 矩阵发布车间**:
   - 路径：`social_matrix/custom-model-factory`
   - 自动生成 Model Card 并发布到 `huggingface.co/zmra/enterprise-lms-instruct-gguf`，为 `https://zmra.com` 建立权威 SEO 知识图谱链接。
