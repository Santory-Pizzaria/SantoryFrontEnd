<script>
export default {
  name: 'ToastNotification',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success', // success, error, warning, info
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  computed: {
    icon() {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      return icons[this.type];
    }
  },
  watch: {
    show(newVal) {
      if (newVal && this.duration > 0) {
        setTimeout(() => {
          this.close();
        }, this.duration);
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>


<template>
  <div v-if="show" :class="['toast', type]">
    <div class="toast-content">
      <span class="toast-icon">{{ icon }}</span>
      <div class="toast-message">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <button class="toast-close" @click="close">×</button>
    </div>
  </div>
</template>


<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

.toast.success {
  background: #4caf50;
  color: white;
}

.toast.error {
  background: #f44336;
  color: white;
}

.toast.warning {
  background: #ff9800;
  color: white;
}

.toast.info {
  background: #2196f3;
  color: white;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.toast-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
}

.toast-message h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: bold;
}

.toast-message p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.toast-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
