<span class="ndp-laravel-wrapper ndp-range-wrapper {{ $class }}">
    <input
        type="text"
        id="{{ $id }}"
        name="{{ $name }}"
        placeholder="{{ $placeholder }}"
        class="ndp-laravel-input"
        autocomplete="off"
        readonly
        {{ $required ? 'required' : '' }}
        {{ $attributes }}
    >
    @if($startName && $endName)
        <input type="hidden" id="{{ $id }}-start" name="{{ $startName }}">
        <input type="hidden" id="{{ $id }}-end"   name="{{ $endName }}">
    @endif
</span>

@once
@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.NepaliDatePicker === 'undefined') return;
    new window.NepaliDatePicker('#{{ $id }}', {
        theme:   '{{ $theme }}',
        lang:    '{{ $lang }}',
        mode:    'range',
        @if($startName && $endName)
        onRangeChange: function (start, end) {
            document.getElementById('{{ $id }}-start').value = start ? start.bs : '';
            document.getElementById('{{ $id }}-end').value   = end   ? end.bs   : '';
        },
        @endif
    });
});
</script>
@endpush
@endonce
